import { Request, Response } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import store from 'store2';
import { requestMap } from '../main';

export async function GetRequestStatus({
  req,
  res,
}: {
  req: Request<{}, any, any, ParsedQs, Record<string, any>>;
  res: Response<any, Record<string, any>, number>;
}) {
  const sessionId = req.query.sessionId;
  const authRequest = requestMap.get(`${sessionId}`);
  const identifier = authRequest?.identifier;
  const onboard = store.get(identifier)?.otherData?.onboard;
  const response = {
    isAuth: authRequest?.isAuth,
    identifier,
    onboard,
  };
  // console.log('authRequest.', response);
  // const getAuthStatus = store.has(sessionId);
  // const identifier = getAuthStatus ? store.get(sessionId) : false;
  // const onboard = store.get(identifier)?.otherData?.onboard;
  return res.status(200).set('Content-Type', 'application/json').send(response);
}
