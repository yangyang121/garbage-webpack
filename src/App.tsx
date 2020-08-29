import React, { useState, useEffect, useCallback } from "react";
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import { Menu, Button } from "antd";
import "./app.less";
import Home from "./container/Home";
import HomeZh from "./container/Home-zh";
import KeyBoard from "./container/KeyBoard";
import KeyBoardZh from "./container/KeyBoard-zh";

function App(props: RouteComponentProps<{}>) {
  const [current, setCurrent] = useState<string>("");
  const [lang, setLang] = useState<string>("en");

  useEffect(() => {
    setCurrent(props.location.pathname.split("/")[1] || "home");
  }, [props.location.pathname]);

  const handleClick = useCallback(
    (e: any) => {
      props.history.push(`/${e.key}`);
      setCurrent(e.key);
    },
    [props.history]
  );
  return (
    <>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="home">Home</Menu.Item>
        <Menu.Item key="keyboard">Keyboard</Menu.Item>
      </Menu>
      <Button
        onClick={() => setLang(lang === "en" ? "zh" : "en")}
        className="header-lang-button"
      >
        {lang === "en" ? "中文" : "english"}
      </Button>
      <div className="app-wrap">
        <Switch>
          <Route path="/" exact>
            {lang === "en" ? <Home /> : <HomeZh />}
          </Route>
          <Route path="/home" exact>
            {lang === "en" ? <Home /> : <HomeZh />}
          </Route>
          <Route path="/keyboard" exact>
            {lang === "en" ? <KeyBoard /> : <KeyBoardZh />}
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default withRouter(App);
