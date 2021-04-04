import React, { useEffect } from "react";
import "./App.css";
import Layout from "./components/layout/all.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./containers/home/home.js";
import SignUp from "./containers/signup/signup.js";
import SignIn from "./containers/signin/signin.js";
import PrivateRoutes from "./PrivateRoutes/privatesignin";
import { IslogggedIn } from "./actions/auth";
import { useDispatch, useSelector } from "react-redux";
function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(IslogggedIn());
    }
  }, []);
  return (
    <div className="App">
      <Switch>
        <PrivateRoutes path="/" exact component={Home} />
        <PrivateRoutes
          path="/products"
          component={() => {
            return;
            <p>hello</p>;
          }}
        />
        <PrivateRoutes
          path="/orders"
          component={() => {
            return <p>Hi</p>;
          }}
        />
        <Route path="/signin" component={SignIn}></Route>
        <Route path="/signup" component={SignUp}></Route>
      </Switch>
    </div>
  );
}

export default App;
