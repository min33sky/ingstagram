import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import UserContext from '../context/userContext';

interface IProps {
  children: React.ReactNode;
  exact?: boolean;
  path: string;
}

/**
 * 로그인 유저 금지 라우터
 * [참고]: (https://reactrouter.com/web/example/auth-workflow)
 * @param param0
 * @returns
 */
function NotAllowedLoggedInRoute({ children, ...rest }: IProps) {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!user) {
          return children;
        }

        if (user) {
          return (
            <Redirect
              to={{
                pathname: ROUTES.DASHBOARD,
                state: { from: location },
              }}
            />
          );
        }
      }}
    />
  );
}

export default NotAllowedLoggedInRoute;
