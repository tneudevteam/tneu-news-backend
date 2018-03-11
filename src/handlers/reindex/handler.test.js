jest.mock('./logic');

import {reindexNews} from './logic';
import {handler} from './handler';

it('should export handler function', () => {
  expect(handler).toBeInstanceOf(Function);
});

it('should call reindexNews logic helper', async () => {
  await handler({}, {}, jest.fn());
  expect(reindexNews).toBeCalledWith();
});
