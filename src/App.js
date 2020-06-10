import React from "react";
import ThemesPage from "./themesPage";
import Container from "@material-ui/core/Container";

import ThemePageStructure from "./themePage";
import PostTemplate from "./postTemplate";
import Profile from "./profile";
import About from "./about";
import Register from "./register";
import Login, { AuthButton, PrivateRoute } from "./login";

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
          <PrivateRoute path={"/posts/:id"} component={PostTemplate} />
          <PrivateRoute path={"/theme/:id"} component={ThemePageStructure} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path={"/themes"} component={ThemesPage} />
          <Redirect from="/" exact to="/themes" />
        </Switch>
      </Layout>
    </Router>
  );
}
