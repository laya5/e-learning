import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./containers/home/home.js";
import SignUp from "./containers/signup/signup.js";
import SignIn from "./containers/signin/signin.js";
import Products from "./containers/Products/products";
import Orders from "./containers/Orders/orders";
import Categories from "./containers/categories/categories";
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
  function Main() {
    return <div>HEllo</div>;
  }
  return (
    <div className="App">
      <Switch>
        <PrivateRoutes path="/" exact component={Home} />
        <PrivateRoutes path="/products" component={Products} />
        <PrivateRoutes path="/orders" component={Orders} />
        <PrivateRoutes path="/categories" component={Categories} />
        <Route path="/signin" component={SignIn}></Route>
        <Route path="/signup" component={SignUp}></Route>
      </Switch>
    </div>
  );
}

export default App;
