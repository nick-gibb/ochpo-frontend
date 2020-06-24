import React, { useState, useEffect } from "react";
import ThemesPage from "./pages/themes";
import ThemePage from "./pages/theme";
import Profile from "./pages/profile";
import Dashboard from "./pages/dashboard";
import "./pages/App.css";
// import Register from "./pages/register";
import Register from "./pages/register2";

// import Login, { Navigation, PrivateRoute } from "./pages/login";
import Login from "./pages/login2";
import { Navigation } from "./pages/login";

import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";

const API_ENDPOINT = "http://localhost:1337";

export default function App() {
  const [items, setItems] = useState([]);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(`${API_ENDPOINT}/themes`)
      .then((res) => res.json())
      .then(
        (result) => {
          result.sort(function (a, b) {
            var keyA = new Date(a.last_post),
              keyB = new Date(b.last_post);
            if (keyA > keyB) return -1;
            if (keyA < keyB) return 1;
            return 0;
          });
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const postTheme = (title, description) => {
    fetch(`${API_ENDPOINT}/themes`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        description: description,
        name_id: title
          .replace(/ /g, "-")
          .replace(/[^a-zA-Z0-9-_]/g, "")
          .toLowerCase(),
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setItems((items) => [...items, result]);
      });
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    // document.title = "Loading...";
    return "Loading...";
  } else {
    return (
      <Router>
        <Navigation items={items} />
        <Switch>
          <Route path={"/themes/:id/:postid"} component={ThemePage} />
          <Route path={"/themes/:id"} component={ThemePage} />
          <Route
            path="/themes"
            render={(props) => (
              <ThemesPage {...props} postTheme={postTheme} items={items} />
            )}
          />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/dashboard" component={Dashboard} />

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />

          <Redirect to="/themes" />
          {/* <Route path="/about" component={About} /> */}
          {/* <Route path="/register" component={Register} /> */}
          {/* <Route path={"/posts/:id"} component={PostPage} /> */}
        </Switch>
      </Router>
    );
  }
}
