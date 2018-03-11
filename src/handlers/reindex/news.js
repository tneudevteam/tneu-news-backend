import {getTotalPages, parsePage} from '@tneu/news';
import _ from 'lodash';
import pMap from 'p-map';

export async function* newsChunkGenerator() {
  const pageNumberChunks = await getPageNumberChunks();

  for (let pageNumberChunk of pageNumberChunks) {
    const parsedPagesChunk = await getPagesChunk(pageNumberChunk);

    let lastPageNumber = 0;
    let currentPage = {hasNext: true, pageNumber: 1};
    let chunk = [];

    // TODO remove pageNumber from condition once tested
    while (parsedPagesChunk.length && currentPage.pageNumber < 50) {
      currentPage = parsedPagesChunk.shift();
      lastPageNumber = currentPage.pageNumber;

      chunk.push(...currentPage.items);

      if (chunk.length >= 100) {
        console.log(`[news][yield]`);
        yield chunk;
        chunk = [];
      }
    }

    if (chunk.length) {
      console.log(`[news][yield][last]`);
      yield chunk;
    }
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

  const pagesChunk = await pMap(pageNumberChunk, i => parsePage(i + 1), {concurrency: 10});
  console.log(`[news][loaded:${loadRange}]`);

  return pagesChunk;
}
