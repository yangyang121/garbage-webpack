import React from "react"
import { Route, Link, Switch } from "react-router-dom"
import loadable from "@loadable/component"

const Home = loadable(() => import("../pages/Home"))
const HooksCount = loadable(() => import("../pages/HooksCount"))
const Hooks = loadable(() => import("../pages/Hooks"))
const ReduxCount = loadable(() => import("../pages/ReduxCount"))
const List = loadable(() => import("../pages/List"))

const PrimaryLayout = () => (
  <div className="primary-layout">
    <header>
      <Link to="/">Home</Link>
      <Link to="/hooksCount">HooksCount</Link>
      <Link to="/hooks">Hooks</Link>
      <Link to="/reduxCount">ReduxCount</Link>
      <Link to="/list">List</Link>
    </header>
    <main>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/hooksCount" exact component={HooksCount} />
        <Route path="/hooks" exact component={Hooks} />
        <Route path="/reduxCount" exact component={ReduxCount} />
        <Route path="/list" exact component={List} />
      </Switch>
    </main>
  </div>
)

export default PrimaryLayout
