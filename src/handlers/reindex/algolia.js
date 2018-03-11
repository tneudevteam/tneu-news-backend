import {getClient} from './algolia-client';

export async function createTempIndex() {
  const client = getClient();
  return client.initIndex('tneu_news_temp');
}
