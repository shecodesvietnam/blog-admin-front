import React, { useState, useEffect } from "react";
import "./App.css";
import PostsPage from "./pages/PostsPage/PostsPage";
import SignInPage from "./pages/SignInPage/SignIn";
import { ThemeProvider } from "@material-ui/core/styles";

import Create from "./component/Post/Create";
import FullPost from "./component/Post/FullPost";
import Edit from "./component/Post/Edit";

import theme from "./themes/theme";

import { Route, Switch, Redirect } from "react-router-dom";
import { tokenContext } from "./utilities/context";
import Gallery from "./pages/Gallery/Gallery";
import Notfound from "./pages/Error/NotFound";

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
          {IsAuth && (
            <>
              <Route exact path="/posts" component={PostsPage} />
              <Route exact path="/posts/create" component={Create} />
              <Route exact path="/posts/:id" component={FullPost} />
              <Route exact path="/posts/:id/edit" component={Edit} />
              <Route exact path="/gallery" component={Gallery} />
            </>
          )}
          <Route path="*" exact={true} component={Notfound}></Route>
        </Switch>
      </tokenContext.Provider>
    </ThemeProvider>
  );
}

export default App;
