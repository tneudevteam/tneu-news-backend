import {handler} from './handler';

it('should export handler function', () => {
  expect(handler).toBeInstanceOf(Function);
});
