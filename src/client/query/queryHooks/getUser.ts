import { getUser } from './../queryFunction/getUser';
import { useQuery } from 'react-query';

export function useGetUser(id: string | undefined) {
  return useQuery(['user', id], () => getUser(id), {
    useErrorBoundary: (error: any) => error.response?.status >= 500,
  });
}
