import React from 'react'
import { Route, Switch, Redirect} from 'react-router-dom'
import HomePage from './pages/HomePage'
import UserPage from './pages/UserPage'
import SnakeHome from './pages/SnakeHome'


export default function App() {
  return (
    <Switch>
      <Redirect exact from="/" to="snake" />
      <Route path="/snake" component={SnakeHome} />
      <Route exact path="/home" component={HomePage} />
      <Route path="/:id" component={UserPage} />
    </Switch>
  )
}
