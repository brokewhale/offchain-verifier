import { auth } from '@iden3/js-iden3-auth';
import { v4 as uuidv4 } from 'uuid';
import { optType, requestMap } from './main';

// GetAuthRequest returns auth request
export async function GetAuthRequest({ _req, res }: optType) {
  // Audience is verifier id
  // const hostUrl = getBaseUrl(_req);
  const hostUrl = 'https://2842-2c0f-2a80-3b-c10-00-748.eu.ngrok.io';
  const sessionId = uuidv4();
  const callbackURL = '/callback';
  const audience =
    'did:polygonid:polygon:mumbai:2qDyy1kEo2AYcP3RT4XGea7BtxsY285szg6yP9SPrs';

  const uri = `${hostUrl}${callbackURL}?sessionId=${sessionId}`;

  // Generate request for basic auth
  const request = auth.createAuthorizationRequestWithMessage(
    'User must be born before 2005',
    'Verify user age',
    audience,
    uri
  );

  request.id = '7f38a193-0918-4a48-9fac-36adfdb8b542';
  request.thid = '7f38a193-0918-4a48-9fac-36adfdb8b542';
  // Add request for a specific proof
  // const proofRequest = {
  //   id: 1,
  //   circuitId: 'credentialAtomicQuerySigV2',
  //   query: {
  //     allowedIssuers: ['*'],
  //     type: 'KYCAgeCredential',
  //     context:
  //       'https://raw.githubusercontent.com/iden3/claim-schema-vocab/main/schemas/json-ld/kyc-v3.json-ld',
  //     credentialSubject: {
  //       birthday: {
  //         $lt: 20050101,
  //       },
  //     },
  //   },
  // };
  // const scope = request.body.scope ?? [];
  // request.body.scope = [...scope, proofRequest];
  const requestData = {
    request: request,
    isAuth: false,
    identifier: null,
  };

  // Store zk request in map associated with session ID
  requestMap.set(`${sessionId}`, requestData);
  const response = {
    sessionId,
    request,
  };

  return res.status(200).set('Content-Type', 'application/json').send(response);
}
