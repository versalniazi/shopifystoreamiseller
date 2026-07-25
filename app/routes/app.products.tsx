import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import {
  Badge,
  Button,
  Card,
  IndexTable,
  Layout,
  Page,
  Text,
  useIndexResourceState,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { useEffect } from "react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(
    `#graphql
      query ProductsAndInventory {
        products(first: 25, sortKey: UPDATED_AT, reverse: true) {
          nodes {
            id
            title
            status
            totalInventory
            variants(first: 1) {
              nodes {
                id
                price
                inventoryQuantity
                inventoryItem {
                  id
                }
              }
            }
          }
        }
        locations(first: 1) {
          nodes {
            id
          }
        }
      }`,
  );
  const { data } = await response.json();

  return {
    products: data?.products.nodes ?? [],
    locationId: data?.locations.nodes[0]?.id ?? null,
  };
};

// Example write: adjusts the first variant's inventory quantity by a fixed
// delta so the "store management" write path (not just reads) is exercised.
export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const formData = await request.formData();
  const variantId = String(formData.get("variantId"));
  const inventoryItemId = String(formData.get("inventoryItemId"));
  const locationId = String(formData.get("locationId"));
  const delta = Number(formData.get("delta"));

  const response = await admin.graphql(
    `#graphql
      mutation AdjustInventory($input: InventoryAdjustQuantitiesInput!) {
        inventoryAdjustQuantities(input: $input) {
          inventoryAdjustmentGroup {
            createdAt
          }
          userErrors {
            field
            message
          }
        }
      }`,
    {
      variables: {
        input: {
          reason: "correction",
          name: "available",
          changes: [
            {
              inventoryItemId,
              locationId,
              delta,
            },
          ],
        },
      },
    },
  );
  const { data } = await response.json();

  return {
    variantId,
    errors: data?.inventoryAdjustQuantities?.userErrors ?? [],
  };
};

export default function Products() {
  const { products, locationId } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const shopify = useAppBridge();

  useEffect(() => {
    if (fetcher.data && fetcher.state === "idle") {
      if (fetcher.data.errors?.length) {
        shopify.toast.show(fetcher.data.errors[0].message, { isError: true });
      } else {
        shopify.toast.show("Inventory updated");
      }
    }
  }, [fetcher.data, fetcher.state, shopify]);

  const { selectedResources, allResourcesSelected, handleSelectionChange } =
    useIndexResourceState(products);

  const rows = products.map((product: any, index: number) => {
    const variant = product.variants.nodes[0];
    return (
      <IndexTable.Row
        id={product.id}
        key={product.id}
        selected={selectedResources.includes(product.id)}
        position={index}
      >
        <IndexTable.Cell>
          <Text as="span" fontWeight="bold">
            {product.title}
          </Text>
        </IndexTable.Cell>
        <IndexTable.Cell>
          <Badge tone={product.status === "ACTIVE" ? "success" : undefined}>
            {product.status}
          </Badge>
        </IndexTable.Cell>
        <IndexTable.Cell>{product.totalInventory}</IndexTable.Cell>
        <IndexTable.Cell>{variant ? `$${variant.price}` : "—"}</IndexTable.Cell>
        <IndexTable.Cell>
          {variant && locationId ? (
            <Button
              size="slim"
              loading={
                fetcher.state !== "idle" &&
                fetcher.formData?.get("variantId") === variant.id
              }
              onClick={() =>
                fetcher.submit(
                  {
                    variantId: variant.id,
                    inventoryItemId: variant.inventoryItem.id,
                    locationId,
                    delta: "1",
                  },
                  { method: "POST" },
                )
              }
            >
              +1 stock
            </Button>
          ) : null}
        </IndexTable.Cell>
      </IndexTable.Row>
    );
  });

  return (
    <Page>
      <TitleBar title="Products & inventory" />
      <Layout>
        <Layout.Section>
          <Card padding="0">
            <IndexTable
              resourceName={{ singular: "product", plural: "products" }}
              itemCount={products.length}
              selectedItemsCount={
                allResourcesSelected ? "All" : selectedResources.length
              }
              onSelectionChange={handleSelectionChange}
              headings={[
                { title: "Product" },
                { title: "Status" },
                { title: "Inventory on hand" },
                { title: "Price" },
                { title: "" },
              ]}
            >
              {rows}
            </IndexTable>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
