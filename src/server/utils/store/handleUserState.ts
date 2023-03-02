import store from "store2";
import { AuthorizationResponseMessage } from "@iden3/js-iden3-auth/dist/cjs/protocol";
import { updateUserSession } from "./handleStoreData";

export function handleUserState(
  userExist: boolean,
  authResponse: AuthorizationResponseMessage,
  sessionId: string | unknown,
  requestMap: any,
) {
  if (userExist) {
    // get and delete user previous session
    const user = store.get(authResponse.from);
    const previousSessionId = user.sessionAuth.sessionId;
    store.remove(previousSessionId);
    requestMap.delete(previousSessionId);

    //Save new session and update user
    store.set(sessionId, authResponse.from);
    const updatedUser = updateUserSession(user, true, sessionId);
    store.set(authResponse.from, updatedUser);
    console.log("userExist");
  } else {
    store.set(sessionId, authResponse.from);
    store.set(authResponse.from, {
      sessionAuth: {
        status: true,
        sessionId: sessionId,
      },
      identifier: authResponse.from,
      otherData: {
        onboard: false,
      },
    });
    console.log("New user ");
  }
}
