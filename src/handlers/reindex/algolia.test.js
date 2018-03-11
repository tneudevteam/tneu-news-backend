jest.mock('./algolia-client');

import {getClient} from './algolia-client';
import {createTempIndex} from './algolia';

describe('#createTempIndex', () => {
  it('should export createTempIndex function', () => {
    expect(createTempIndex).toBeInstanceOf(Function);
  });
});
