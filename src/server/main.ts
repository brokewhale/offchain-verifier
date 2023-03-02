import { getBaseUrl } from './utils/others/getBaseUrl';
import express from 'express';
import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import store from 'store2';
import ViteExpress from 'vite-express';
import path from 'path';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { GetAuthRequest } from './GetAuthRequest';
import { Callback } from './Callback';
import { GetUser } from './misc/GetUser';
import { UpdateUser } from './misc/UpdateUser';
import { GetRequestStatus } from './misc/GetRequestStatus';

dotenv.config();
const app = express();
export const keyDIR = path.join(process.cwd(), 'keys');

app.get('/hello', (_, res) => {
  res.send('Hello Vite + React + TypeScript!');
});
// store.clearAll();
// Create a map to store the auth requests and their session IDs
export const requestMap = new Map();
app.get('/events', async function (req, res) {
  const { sessionId } = req.query as { sessionId: string };
  console.log('sessionId', sessionId);

  console.log('Got /events');
  res.set({
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
  });
  res.flushHeaders();
  res.write('retry: 1000\n\n');
  const id = setInterval(() => {
    const getAuthStatus = store.has(sessionId);
    const identifier = getAuthStatus ? store.get(sessionId) : false;
    const onboard = store.get(identifier)?.otherData?.onboard;
    res.write(
      `data:  ${JSON.stringify({
        identifier: identifier,
        clientId: sessionId,
        onboard: onboard,
      })}\n\n`
    );
  }, 1000);
  const { socket } = res;
  if (socket) {
    socket.on('end', () => {
      console.log(`Disconnect: ${id} `);
      clearInterval(id);
      res.end();
    });
  }
});

app.get('/sign-in', (req, res) => {
  // const baseUrl = getBaseUrl();
  console.log('get Auth Request');
  GetAuthRequest({ _req: req, res });
});
app.get('/status', (req, res) => {
  // console.log('get Request status');
  GetRequestStatus({ req, res });
});

app.post('/callback', (req, res) => {
  console.log('callback');
  Callback(req, res);
});

app.get('/getUser', (req, res) => {
  console.log('get userExist');
  GetUser({ req, res });
});
app.post('/updateUser', (req, res) => {
  console.log('updateUser userExist');
  UpdateUser({ req, res });
});

ViteExpress.listen(app, 3000, () =>
  console.log('Server is listening on port 3000...')
);

export interface optType {
  _req: Request<{}, any, any, ParsedQs, Record<string, any>>;
  res: Response<any, Record<string, any>, number>;
}
