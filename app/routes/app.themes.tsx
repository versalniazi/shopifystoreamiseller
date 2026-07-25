import { useEffect, useState } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import {
  BlockStack,
  Button,
  Card,
  InlineStack,
  Layout,
  Page,
  Select,
  Text,
  TextField,
} from "@shopify/polaris";
import { TitleBar, useAppBridge } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(
    `#graphql
      query Themes {
        themes(first: 20) {
          nodes {
            id
            name
            role
          }
        }
      }`,
  );
  const { data } = await response.json();

  return { themes: data?.themes.nodes ?? [] };
};

// A single action handles both reading and writing a theme file, keyed off
// `intent`, so the design page can load an asset's current content before
// letting the user overwrite it.
export const action = async ({ request }: ActionFunctionArgs) => {
  const { admin } = await authenticate.admin(request);
  const formData = await request.formData();
  const intent = String(formData.get("intent"));
  const themeId = String(formData.get("themeId"));
  const filename = String(formData.get("filename"));

  if (intent === "load") {
    const response = await admin.graphql(
      `#graphql
        query ThemeFile($themeId: ID!, $filename: [String!]!) {
          theme(id: $themeId) {
            files(filenames: $filename) {
              nodes {
                filename
                body {
                  ... on OnlineStoreThemeFileBodyText {
                    content
                  }
                }
              }
            }
          }
        }`,
      { variables: { themeId, filename: [filename] } },
    );
    const { data } = await response.json();
    const file = data?.theme?.files.nodes[0];

    return {
      intent,
      content: file?.body?.content ?? "",
      found: Boolean(file),
      errors: [] as { message: string }[],
    };
  }

  const content = String(formData.get("content"));
  const response = await admin.graphql(
    `#graphql
      mutation SaveThemeFile($themeId: ID!, $files: [OnlineStoreThemeFilesUpsertFileInput!]!) {
        themeFilesUpsert(themeId: $themeId, files: $files) {
          upsertedThemeFiles {
            filename
          }
          userErrors {
            field
            message
          }
        }
      }`,
    {
      variables: {
        themeId,
        files: [{ filename, body: { type: "TEXT", value: content } }],
      },
    },
  );
  const { data } = await response.json();

  return {
    intent,
    content,
    found: true,
    errors: data?.themeFilesUpsert?.userErrors ?? [],
  };
};

export default function Themes() {
  const { themes } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  const shopify = useAppBridge();

  const [themeId, setThemeId] = useState(themes[0]?.id ?? "");
  const [filename, setFilename] = useState("config/settings_data.json");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (fetcher.data && fetcher.state === "idle") {
      if (fetcher.data.errors?.length) {
        shopify.toast.show(fetcher.data.errors[0].message, { isError: true });
      } else if (fetcher.data.intent === "load") {
        setContent(fetcher.data.content);
        shopify.toast.show(
          fetcher.data.found ? "File loaded" : "File not found in this theme",
        );
      } else {
        shopify.toast.show("Theme file saved");
      }
    }
  }, [fetcher.data, fetcher.state, shopify]);

  const busy = fetcher.state !== "idle";

  return (
    <Page>
      <TitleBar title="Store design" />
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">
                Edit a theme file
              </Text>
              <Text as="p" variant="bodyMd">
                Pick a theme and a file path (e.g.{" "}
                <code>config/settings_data.json</code> or{" "}
                <code>sections/announcement-bar.liquid</code>), load its
                current content, edit, and save back to the store.
              </Text>
              <Select
                label="Theme"
                options={themes.map((theme: any) => ({
                  label: `${theme.name} (${theme.role})`,
                  value: theme.id,
                }))}
                value={themeId}
                onChange={setThemeId}
              />
              <TextField
                label="File path"
                autoComplete="off"
                value={filename}
                onChange={setFilename}
              />
              <InlineStack gap="200">
                <Button
                  loading={busy}
                  disabled={!themeId || !filename}
                  onClick={() =>
                    fetcher.submit(
                      { intent: "load", themeId, filename },
                      { method: "POST" },
                    )
                  }
                >
                  Load file
                </Button>
                <Button
                  variant="primary"
                  loading={busy}
                  disabled={!themeId || !filename}
                  onClick={() =>
                    fetcher.submit(
                      { intent: "save", themeId, filename, content },
                      { method: "POST" },
                    )
                  }
                >
                  Save file
                </Button>
              </InlineStack>
              <TextField
                label="File content"
                autoComplete="off"
                value={content}
                onChange={setContent}
                multiline={12}
                monospaced
              />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
