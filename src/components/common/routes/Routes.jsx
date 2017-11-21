import React from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import ListChirpsPage from '../../chirps/ListChirpsPage'
import ProfileChirpsPage from '../../chirps/ProfileChirpsPage'
import DeleteChirpPage from '../../chirps/DeleteChirpPage'
import RegisterPage from '../../users/RegisterPage'
import LoginPage from '../../users/LoginPage'
import LogoutPage from '../../users/LogoutPage'
import DiscoverPage from '../../users/DiscoverPage'

const Routes = () => (
  <Switch>
    <PrivateRoute path='/' exact component={ListChirpsPage} />
    <PrivateRoute path='/discover' component={DiscoverPage} />
    <Route path='/users/register' exact component={RegisterPage} />
    <Route path='/users/login' exact component={LoginPage} />
    <PrivateRoute path='/users/logout' exact component={LogoutPage} />
    <PrivateRoute path='/users/:username' component={ProfileChirpsPage} />
    <PrivateRoute path='/chirps/delete/:id' component={DeleteChirpPage} />
  </Switch>
)

export default Routes
