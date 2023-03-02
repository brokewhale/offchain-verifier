import { Request, Response } from 'express-serve-static-core';
import store from 'store2';

export async function GetUser({ req, res }: { req: Request; res: Response }) {
  const { identifier } = req.query as { identifier: string };
  console.log('identifier', identifier);

  const userExist = store.has(identifier);
  if (!userExist)
    return res.status(404).send({ status: false, msg: 'user not found' });

  const user = store.get(identifier);

  return res
    .status(200)
    .set('Content-Type', 'application/json')
    .send({ status: true, user });
}
