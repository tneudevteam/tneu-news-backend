import {getIndexTemp, swapIndices} from './algolia';
import {newsChunkGenerator} from './news';

export async function reindexNews() {
  const indexTemp = await getIndexTemp();
  console.log(`[reindex][indices-init]`);

  for await (let chunk of newsChunkGenerator()) {
    await indexTemp.addObjects(chunk);
    console.log(`[reindex][chunk-added:${chunk.length}]`);
  }

  await swapIndices();
  console.log(`[reindex][done]`);
}
