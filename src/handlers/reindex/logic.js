import {getIndexTemp, swapIndices} from './algolia';
import {newsChunkGenerator} from './news';

export async function reindexNews() {
  const indexTemp = await getIndexTemp();
  console.log(`[reindex][indices-init]`);

  for await (let chunk of newsChunkGenerator()) {
    try {
      await indexTemp.addObjects(chunk);
      console.log(`[reindex][chunk-added:${chunk.length}]`);
    } catch (error) {
      // TODO fix too big item: AlgoliaSearchError
      // Record at the position 4 is too big size=105089 bytes
      // pages 459-507
      console.log(error);
    }
  }

  await swapIndices();
  console.log(`[reindex][done]`);
}
