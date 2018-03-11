import wrap from 'apex.js';

export const handler = wrap((event, ctx) => {
  ctx.waitForEmptyEventLoop = false;
});
