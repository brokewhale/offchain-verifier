export const getBaseUrl = (req: { protocol: any; headers: any }) => {
  const { protocol, headers } = req;

  return `${protocol}://${headers.host}`;
};
