import algoliasearch from 'algoliasearch';

let client;

export function getClient() {
  if (client) {
    return client;
  }

  client = algoliasearch(process.env.ALGOLIA_CLIENT_ID, process.env.ALGOLIA_CLIENT_SECRET);

  return client;
}
