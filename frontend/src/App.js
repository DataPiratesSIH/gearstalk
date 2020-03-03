import React from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Redirect, 
  Switch 
} from 'react-router-dom';

import { AuthContext } from './components/context/auth-context';
import { useAuth } from './components/hooks/auth-hook';

import { ThemeProvider } from '@material-ui/styles';
import customTheme from './components/theme/theme.json';
import { createMuiTheme } from '@material-ui/core/styles';

import ResponsiveDrawer from './components/utils/ResponsiveDrawer';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Landing from './components/utils/Landing';

const theme = createMuiTheme(customTheme);

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  // if (token) {
  //   routes = (
  //     <Switch>
  //       <Route path="/" exact>
  //           <Landing />
  //       </Route>
  //       <Redirect to="/" />
  //     </Switch>
  //   )
  // } else {
  //   routes = (
  //     <Switch>
  //       <Route path="/" exact>
  //           <Landing />
  //       </Route>
  //       <Route path="/signin" exact>
  //           <Signin />
  //       </Route>
  //       <Route path="/signup" exact>
  //         <Signup />
  //       </Route>
  //       <Redirect to="/" />
  //     </Switch>
  //   )
  // }

  routes = (
        <Switch>
          <Route path="/" exact>
              <Landing />
          </Route>
          <Route path="/signin" exact>
              <Signin />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <Redirect to="/" />
        </Switch>
  )
  

  return (
    <ThemeProvider theme={theme}>
        <AuthContext.Provider
          value={{
            isLoggedIn: !!token,
            token: token,
            userId: userId,
            login: login,
            logout: logout
          }}
        >
          <Router>
            <ResponsiveDrawer>
            {routes}
            </ResponsiveDrawer>
          </Router>
        </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
