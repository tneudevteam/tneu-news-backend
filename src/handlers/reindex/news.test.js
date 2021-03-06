jest.mock('@tneu/news');

import {getTotalPages, parsePage} from '@tneu/news';
import {newsChunkGenerator} from './news';

describe('#newsChunkGenerator', () => {
  getTotalPages.mockReturnValue(3);
  parsePage
    .mockReturnValueOnce({
      pageNumber: 1,
      hasNext: true,
      items: 'a'.repeat(500).split('')
    })
    .mockReturnValueOnce({
      pageNumber: 2,
      hasNext: true,
      items: 'b'.repeat(500).split('')
    })
    .mockReturnValueOnce({
      pageNumber: 3,
      hasNext: false,
      items: 'c'.repeat(25).split('')
    });

  it('should export newsChunkGenerator function', () => {
    expect(newsChunkGenerator).toBeInstanceOf(Function);
  });

  it('should yield 100+100+25 items', async () => {
    expect.assertions(3);
    let i = 0;

    for await (let chunk of newsChunkGenerator()) {
      ++i;

      if (i === 1) {
        expect(chunk).toEqual('a'.repeat(500).split(''));
      }

      if (i === 2) {
        expect(chunk).toEqual('b'.repeat(500).split(''));
      }

      if (i === 3) {
        expect(chunk).toEqual('c'.repeat(25).split(''));
      }
    }
  });
});
