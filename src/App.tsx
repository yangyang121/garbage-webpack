import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps
} from "react-router-dom";
import { Menu } from "antd";
import "./app.less";
import Home from "./container/Home";
import KeyBoard from "./container/KeyBoard";
import CustomHooks from "./container/CustomHooks";

function App(props: RouteComponentProps<{}>) {
  const [current, setCurrent] = useState<string>("");

  useEffect(() => {
    setCurrent(props.location.pathname.split("/")[1] || "home");
  }, []);

  function handleClick(e: any) {
    props.history.push(`/${e.key}`);
    setCurrent(e.key);
  }
  return (
    <>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home">Home</Menu.Item>
        <Menu.Item key="keyboard">Keyboard</Menu.Item>
        <Menu.Item key="customhooks">CustomHooks</Menu.Item>
      </Menu>
      <div className="app-wrap">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/home" exact>
            <Home />
          </Route>
          <Route path="/keyboard" exact>
            <KeyBoard />
          </Route>
          <Route path="/customhooks" exact>
            <CustomHooks />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default withRouter(App);
