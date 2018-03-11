import wrap from 'apex.js';
import {reindexNews} from './logic';

export const handler = wrap((event, ctx) => {
  ctx.waitForEmptyEventLoop = false;
  return reindexNews();
});
