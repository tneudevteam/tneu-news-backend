import wrap from 'apex.js';
import {reindexNews} from './logic';

require('./xray');

export const handler = wrap((event, ctx) => {
  ctx.waitForEmptyEventLoop = false;
  return reindexNews();
});
