import React, { useState, useEffect } from "react";
import "./App.css";
import PostsPage from "./pages/PostsPage/PostsPage";
import SignIn from "./pages/SignInPage/SignIn";
import Create from "./component/Create";
import Edit from "./component/Edit";
import Delete from "./component/Delete";



import { ThemeProvider } from "@material-ui/core/styles";

import theme from "./themes/theme";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

function App() {
  const [IsAuth, setAuth] = useState(false);
  useEffect(() => {
    const JWT = localStorage.getItem("JWT");
    if (JWT) {
      setAuth(true);
    }
  }, []);
  return (
  //   <Router>
  //     <Route>
  //       <ThemeProvider theme={theme}>
  //         <Switch>
  //           <Route exact path="/">
  //             {IsAuth ? <Redirect to="/posts" /> : SignIn}
  //           </Route>
  //           <Route exact path="/posts" component={PostsPage} />
  //         </Switch>
  //       </ThemeProvider>
  //     </Route>
  //   </Router>
  <Create/>

  );
  
}

export default App;
