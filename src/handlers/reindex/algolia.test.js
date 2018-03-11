jest.mock('./algolia-client');

import {getClient} from './algolia-client';
import {getIndexTemp, getIndex, swapIndices} from './algolia';

const moveIndexMock = jest.fn();
const getSettingsMock = jest.fn();
const setSettingsMock = jest.fn();
const initIndexMock = jest.fn().mockReturnValue({
  getSettings: getSettingsMock,
  setSettings: setSettingsMock
});
getClient.mockReturnValue({
  initIndex: initIndexMock,
  moveIndex: moveIndexMock
});

beforeEach(() => {
  initIndexMock.mockClear();
  getSettingsMock.mockClear();
  setSettingsMock.mockClear();
  moveIndexMock.mockClear();
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

describe('#swapIndices', () => {
  it('should export swapIndices function', () => {
    expect(swapIndices).toBeInstanceOf(Function);
  });

  it('should call getSettings', async () => {
    await swapIndices();
    expect(getSettingsMock).toBeCalledWith();
  });

  it('should call setSettings w/ old index settings', async () => {
    getSettingsMock.mockReturnValueOnce({a: 1});
    await swapIndices();

    expect(setSettingsMock).toBeCalledWith({a: 1});
  });

  it('should call moveIndex w/ names - from old to new', async () => {
    await swapIndices();
    expect(moveIndexMock).toBeCalledWith('tneu_news_temp', 'tneu_news');
  });
});
