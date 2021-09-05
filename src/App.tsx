import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as Routes from './constants/routes';

const Login = lazy(() => import('./pages/LoginPage'));
const Signup = lazy(() => import('./pages/SignupPage'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading....</p>}>
        <Switch>
          <Route exact path={Routes.DASHBOARD} render={() => <div>대시보드</div>}></Route>
          <Route path={Routes.LOGIN} component={Login} />
          <Route path={Routes.SIGN_UP} component={Signup} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
