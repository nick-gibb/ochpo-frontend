import React from "react";
import Container from "@material-ui/core/Container";

import ThemesPage from "./pages/themes";
import ThemePage from "./pages/theme";
import PostPage from "./pages/posts";
import Profile from "./pages/profile";
import About from "./pages/about";
import Register from "./pages/register";
import Login, { AuthButton, PrivateRoute } from "./pages/login";


import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

function Layout(props) {
  const layout = (
    <div>
      <AuthButton />
      <Container>{props.children}</Container>
    </div>
  );
  return layout;
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <PrivateRoute path={"/posts/:id"} component={PostPage} />
          <PrivateRoute path={"/theme/:id"} component={ThemePage} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path={"/themes"} component={ThemesPage} />
          <Redirect from="/" exact to="/themes" />
        </Switch>
      </Layout>
    </Router>
  );
}
