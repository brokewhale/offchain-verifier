import api from '../../utils/axiosInstance';

export const getSignInReq = async () => {
  const { data } = await api.get('sign-in', {
    headers: {
      accept: '*/*',
    },
  });
  return data;
};
