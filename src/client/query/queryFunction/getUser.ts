import api from '../../utils/axiosInstance';

export const getUser = async (id: string | undefined) => {
  const { data } = await api.get(`getUser?identifier=${id}`, {
    headers: {
      accept: '*/*',
    },
  });

  return data;
};
