jest.mock('./algolia');
jest.mock('./news');

import {newsChunkGenerator} from './news';
import newsChunkGeneratorMock from './news-mock';
import {getIndex, getIndexTemp, swapIndices} from './algolia';
import {reindexNews} from './logic';

const addObjectsMock = jest.fn();
const addObjectsTempMock = jest.fn();
newsChunkGenerator.mockImplementation(newsChunkGeneratorMock);
getIndex.mockReturnValue({
  addObjects: addObjectsMock
});
getIndexTemp.mockReturnValue({
  addObjects: addObjectsTempMock
});

beforeEach(() => {
  addObjectsMock.mockClear();
  addObjectsTempMock.mockClear();
});

it('should export reindexNews function', () => {
  expect(reindexNews).toBeInstanceOf(Function);
});

it('should call getIndexTemp algolia helper', async () => {
  await reindexNews();
  expect(getIndexTemp).toBeCalledWith();
});

it('should call swapIndices algolia helper', async () => {
  await reindexNews();
  expect(swapIndices).toBeCalledWith();
});
