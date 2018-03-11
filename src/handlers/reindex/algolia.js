import {getClient} from './algolia-client';

const MAIN_INDEX_NAME = 'tneu_news';
const TEMP_INDEX_NAME = 'tneu_news_temp';

export async function getIndex() {
  const client = getClient();
  return client.initIndex(MAIN_INDEX_NAME);
}

export async function getIndexTemp() {
  const client = getClient();
  return client.initIndex(TEMP_INDEX_NAME);
}

export async function swapIndices() {
  const client = getClient();
  const index = await getIndex();
  const indexTemp = await getIndexTemp();
  console.log(`[swap][indices-init]`);

  const indexSettings = await index.getSettings();
  await indexTemp.setSettings(indexSettings);
  console.log(`[swap][settings-copied]`);

  await client.moveIndex(TEMP_INDEX_NAME, MAIN_INDEX_NAME);
  console.log(`[swap][moved]`);
}
