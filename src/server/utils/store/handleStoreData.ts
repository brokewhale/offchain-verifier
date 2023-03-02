import store from "store2";

export const updateUserSession = (
  user: any,
  status: boolean,
  sessionId: any,
) => {
  const sessionAuth = {
    status,
    sessionId,
  };
  const updatedUser = {
    ...user,
    sessionAuth,
  };
  store.set(user.identifier, updatedUser);
  return updatedUser;
};

// export const updateUserDetails = (identifier: string, details: any) => {

//   const otherData = {
//     onboard: true,
//     ...details,
//   };
//   const updatedUserDetails = {
//     ...user,
//     otherData,
//   };
//   //   store.set(identifier, updatedUserDetails);
//   return updatedUserDetails;
// };
