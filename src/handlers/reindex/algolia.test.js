jest.mock('./algolia-client');

import {getClient} from './algolia-client';
import {getIndexTemp, getIndex} from './algolia';

describe('#getIndexTemp', () => {
  it('should export getIndexTemp function', () => {
    expect(getIndexTemp).toBeInstanceOf(Function);
  });
});

describe('#getIndex', () => {
  it('should export getIndex function', () => {
    expect(getIndex).toBeInstanceOf(Function);
  });
});
