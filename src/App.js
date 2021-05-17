import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import PostsPage from "./pages/PostsPage/PostsPage";
import SignInPage from "./pages/SignInPage/SignIn";
import { ThemeProvider } from "@material-ui/core/styles";

import Create from "./component/Create";
import Post from "./component/Post";
import Edit from "./component/Edit";

import theme from "./themes/theme";

import { Route, Switch, Redirect } from "react-router-dom";
import { tokenContext } from "./utilities/context";

function App() {
  const [token, setToken] = useState();
  const [IsAuth, setAuth] = useState(false);
  useEffect(() => {
    const JWT = localStorage.getItem("x-auth-token");
    if (JWT) {
      setToken(JWT);
      setAuth(true);
    }
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <tokenContext.Provider value={token}>
        <Switch>
          <Route exact path="/" component={SignInPage}>
            {IsAuth && <Redirect to="/posts" />}
          </Route>
          <Route exact path="/posts" component={PostsPage} />
          <Route exact path="/posts/create" component={Create} />
          <Route exact path="/posts/:id" component={Post} />
          <Route exact path="/posts/:id/edit" component={Edit} />
        </Switch>
      </tokenContext.Provider>
    </ThemeProvider>
  );
}

export default App;
