import React from 'react'
import { Route, Redirect, HashRouter} from 'react-router-dom'
import HomePage from './pages/HomePage'
import UserPage from './pages/UserPage'
import SnakeHome from './pages/SnakeHome'


export default function App() {
  return (
    <HashRouter>
      <Redirect exact from="/" to="snake" />
      <Route exact path="/snake" component={SnakeHome} />
      <Route exact path="/home" component={HomePage} />
      <Route exact path="/user/:id" component={UserPage} />
    </HashRouter>
  )
}
