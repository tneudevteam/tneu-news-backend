import {getTotalPages, parsePage} from '@tneu/news';
import _ from 'lodash';
import pMap from 'p-map';

export async function* newsChunkGenerator() {
  const pageNumberChunks = await getPageNumberChunks();
  let chunk = [];

  for (let pageNumberChunk of pageNumberChunks) {
    const parsedPagesChunk = await getPagesChunk(pageNumberChunk);

    while (parsedPagesChunk.length) {
      const currentPage = parsedPagesChunk.shift();
      chunk.push(...currentPage.items);
      console.log(`[news][chunk-size:${chunk.length}]`);

      if (chunk.length >= 500) {
        console.log(`[news][yield]`);
        yield chunk;
        chunk = [];
      }
    }
  }

  if (chunk.length) {
    console.log(`[news][yield][last]`);
    yield chunk;
  }
}

async function getPageNumberChunks() {
  const totalPages = await getTotalPages();
  console.log(`[news][pages:${totalPages}]`);

  const pageNumberChunks = _.chunk(_.times(totalPages), Math.ceil(totalPages / 10));
  console.log(`[news][pages-chunks:${pageNumberChunks.length}]`);

  return pageNumberChunks;
}

async function getPagesChunk(pageNumberChunk) {
  const loadRange = `${_.head(pageNumberChunk)}-${_.last(pageNumberChunk)}`;
  console.log(`[news][start:${loadRange}]`);

  const pagesChunk = await pMap(pageNumberChunk, i => parsePage(i + 1), {concurrency: 50});
  console.log(`[news][loaded:${loadRange}]`);

  return pagesChunk;
}
