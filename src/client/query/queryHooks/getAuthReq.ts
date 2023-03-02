import { getSignInReq } from './../queryFunction/getAuthReq';
import { useQuery } from 'react-query';

export function useGetSignInAuthReq() {
  return useQuery('authReq', () => getSignInReq(), {
    useErrorBoundary: (error: any) => error.response?.status >= 500,
    enabled: true,
    staleTime: Infinity,
  });
}
