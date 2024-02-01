import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";

const host = `https://telegra.ph`;
const app = new Hono();

app.get('/', serveStatic({ root: './public' }));

app.post('/upload', async (c) => {
  const body = await c.req.parseBody();
  const formData = new FormData();

  formData.append('file', body.file as Blob, 'test.png');
  return fetch(`${host}/upload`, {
    method: 'POST',
    body: formData
  })
})

app.get('/file/:fileName', async (c) => {
  return fetch(`${host}/file/${c.req.param('fileName')}`)
})

export default app;