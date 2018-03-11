import {parsePage} from '@tneu/news';

export async function* newsChunkGenerator() {
  let lastPageNumber = 0;
  let currentPage = {hasNext: true, pageNumber: 1};
  let chunk = [];
  console.log(`[news][start]`);

  while (currentPage.hasNext && currentPage.pageNumber < 10) {
    currentPage = await parsePage(lastPageNumber + 1);
    lastPageNumber = currentPage.pageNumber;
    console.log(`[news][page:${lastPageNumber}]`);

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
