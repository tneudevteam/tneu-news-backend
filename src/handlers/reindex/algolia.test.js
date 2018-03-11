jest.mock('./algolia-client');

import {getClient} from './algolia-client';
import {getIndexTemp, getIndex} from './algolia';

const initIndexMock = jest.fn();
getClient.mockReturnValue({
  initIndex: initIndexMock
});

beforeEach(() => {
  initIndexMock.mockClear();
});

describe('#getIndex', () => {
  it('should export getIndex function', () => {
    expect(getIndex).toBeInstanceOf(Function);
  });

  it('should call initIndex w/ main name', async () => {
    await getIndex();
    expect(initIndexMock).toBeCalledWith('tneu_news');
  });
});

describe('#getIndexTemp', () => {
  it('should export getIndexTemp function', () => {
    expect(getIndexTemp).toBeInstanceOf(Function);
  });

  it('should call initIndex w/ temp name', async () => {
    await getIndexTemp();
    expect(initIndexMock).toBeCalledWith('tneu_news_temp');
  });
});
