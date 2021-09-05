import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as Routes from './constants/routes';
import UserContext from './context/userContext';
import useAuthListener from './hooks/useAuthListener';

const Login = lazy(() => import('./pages/LoginPage'));
const Signup = lazy(() => import('./pages/SignupPage'));
const NotFound = lazy(() => import('./pages/NotFoundPage'));
const Dashboard = lazy(() => import('./pages/DashBoardPage'));

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <BrowserRouter>
        <Suspense fallback={<p>Loading....</p>}>
          <Switch>
            <Route exact path={Routes.DASHBOARD} component={Dashboard} />
            <Route path={Routes.LOGIN} component={Login} />
            <Route path={Routes.SIGN_UP} component={Signup} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
