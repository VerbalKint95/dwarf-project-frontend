import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { isAuthenticated } from './auth';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated()) {
        router.push('/auth/login');
      }
    }, []);

    return typeof window !== 'undefined' && isAuthenticated() ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
