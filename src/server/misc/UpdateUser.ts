import { Request, Response } from 'express-serve-static-core';
import store from 'store2';
import getRawBody from 'raw-body';

export async function UpdateUser({
  req,
  res,
}: {
  req: Request;
  res: Response;
}) {
  const { query } = req;
  const { identifier } = query as { identifier: string };

  const userExist = store.has(identifier);
  const raw = await getRawBody(req);
  const rawBody = raw.toString().trim();
  const body = JSON.parse(rawBody);

  // console.log('boddy', tokenStr);
  if (!userExist)
    return res.status(404).send({ status: false, msg: 'user not found' });

  try {
    const user = store.get(identifier);
    const otherData = {
      onboard: true,
      ...body,
    };
    const updatedUserDetails = {
      ...user,
      otherData,
    };
    store.set(identifier, updatedUserDetails);
    res.status(200).send(updatedUserDetails);
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
