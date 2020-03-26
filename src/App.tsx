import React, { useState } from "react";
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps
} from "react-router-dom";
import { Menu } from "antd";
import Home from "./container/Home";
import KeyBoard from "./container/KeyBoard";
import "./app.less";

function App(props: RouteComponentProps<{}>) {
  const [current, setCurrent] = useState<string>("");
  function handleClick(e: any) {
    props.history.push(e.key === "home" ? "" : `/${e.key}`);
    setCurrent(e.key);
  }
  return (
    <>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home">Home</Menu.Item>
        <Menu.Item key="keyboard">Keyboard</Menu.Item>
      </Menu>
      <div className="app-wrap">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/keyboard" exact>
            <KeyBoard />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default withRouter(App);
