import {getClient} from './algolia-client';

export async function getIndex() {
  const client = getClient();
  return client.initIndex('tneu_news');
}

export async function getIndexTemp() {
  const client = getClient();
  return client.initIndex('tneu_news_temp');
}
