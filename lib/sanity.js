import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "073a2xqy",
  dataset: "production",
  apiVersion: "2022-11-20",
  token:
    "skDouDJfzjgGpo7zg1OrEiYZN6PorZCwo8epD2to1EmmpmmiDOFbGx9voXIixgA5brvQFKFldzySWqTc01HN011u44Xqc5FWNVzzK7u2qVBEvQBP1YBFCfQQ17hGXDb04ufNsiTxnKZ5kYG1QLsFmkVORlmdyr3zT8LPWPQayzdI3mUhcyh9",
  useCdn: false,
  ignoreBrowserTokenWarning: true,
});
