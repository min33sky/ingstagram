import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as Routes from './constants/routes';
import UserContext from './context/userContext';
import NotAllowedLoggedInRoute from './helpers/not-allowed-logged-in.route';
import ProtectedRoute from './helpers/protected.route';
import useAuthListener from './hooks/useAuthListener';

const Login = lazy(() => import('./pages/LoginPage'));
const Signup = lazy(() => import('./pages/SignupPage'));
const NotFound = lazy(() => import('./pages/NotFoundPage'));
const Dashboard = lazy(() => import('./pages/DashBoardPage'));
const Profile = lazy(() => import('./pages/ProfilePage'));

function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <BrowserRouter>
        <Suspense fallback={<p>Loading....</p>}>
          <Switch>
            <ProtectedRoute exact path={Routes.DASHBOARD}>
              <Dashboard />
            </ProtectedRoute>
            <NotAllowedLoggedInRoute path={Routes.LOGIN}>
              <Login />
            </NotAllowedLoggedInRoute>
            <NotAllowedLoggedInRoute path={Routes.SIGN_UP}>
              <Signup />
            </NotAllowedLoggedInRoute>

            <Route path={Routes.PROFILE} component={Profile} />

            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
