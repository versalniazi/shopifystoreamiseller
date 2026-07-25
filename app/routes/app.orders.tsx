import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Badge, Card, IndexTable, Layout, Page, Text } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(
    `#graphql
      query RecentOrders {
        orders(first: 25, sortKey: CREATED_AT, reverse: true) {
          nodes {
            id
            name
            displayFinancialStatus
            displayFulfillmentStatus
            createdAt
            totalPriceSet {
              shopMoney {
                amount
                currencyCode
              }
            }
            customer {
              displayName
              email
            }
          }
        }
      }`,
  );
  const { data } = await response.json();

  return { orders: data?.orders.nodes ?? [] };
};

export default function Orders() {
  const { orders } = useLoaderData<typeof loader>();

  const rows = orders.map((order: any, index: number) => (
    <IndexTable.Row id={order.id} key={order.id} position={index}>
      <IndexTable.Cell>
        <Text as="span" fontWeight="bold">
          {order.name}
        </Text>
      </IndexTable.Cell>
      <IndexTable.Cell>
        {order.customer
          ? `${order.customer.displayName} (${order.customer.email ?? "no email"})`
          : "Guest"}
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Badge>{order.displayFinancialStatus ?? "—"}</Badge>
      </IndexTable.Cell>
      <IndexTable.Cell>
        <Badge>{order.displayFulfillmentStatus ?? "—"}</Badge>
      </IndexTable.Cell>
      <IndexTable.Cell>
        {order.totalPriceSet.shopMoney.amount}{" "}
        {order.totalPriceSet.shopMoney.currencyCode}
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <Page>
      <TitleBar title="Orders & customers" />
      <Layout>
        <Layout.Section>
          <Card padding="0">
            <IndexTable
              resourceName={{ singular: "order", plural: "orders" }}
              itemCount={orders.length}
              selectable={false}
              headings={[
                { title: "Order" },
                { title: "Customer" },
                { title: "Payment" },
                { title: "Fulfillment" },
                { title: "Total" },
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
