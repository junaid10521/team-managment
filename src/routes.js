import React from 'react';
import Layout from './Hoc/Layout';
import {Switch, Route} from 'react-router-dom';

import Home from './Components/home';
import SignIn from './Components/signIn';
import TheTeam from './Components/theTeam';
import TheMatches from './Components/theMatches';
import NotFound from './Components/ui/notFound';

import Dashboard from './Components/admin/Dashboard';
import AdminMatches from './Components/admin/AdminMatches';
import AddEditMatch from './Components/admin/AdminMatches/addEditMatch';
import AddEditPlayers from './Components/admin/AdminPlayers/addEditPlayers';
import AdminPlayers from './Components/admin/AdminPlayers';

import PrivateRoute from './Components/AuthRoutes/PrivateRoute';
import PublicRoute from './Components/AuthRoutes/PublicRoute';

const Routes = (props) => {
  return(
    <Layout>
      <Switch>
        <PrivateRoute {...props} exact component={AdminPlayers} path='/admin_players' />
        <PrivateRoute {...props} exact component={AddEditPlayers} path='/admin_players/add_players/' />
        <PrivateRoute {...props} exact component={AddEditPlayers} path='/admin_players/add_players/:id' />
        <PrivateRoute {...props} exact component={AddEditMatch} path='/admin_matches/edit_match/' />
        <PrivateRoute {...props} exact component={AddEditMatch} path='/admin_matches/edit_match/:id' />
        <PrivateRoute {...props} exact component={AdminMatches} path='/admin_matches' />
        <PrivateRoute {...props} exact component={Dashboard} path='/dashboard' />
        <PublicRoute {...props} restricted = {true} exact component={SignIn} path='/sign_in' />
        <PublicRoute {...props} restricted = {false} exact component={TheTeam} path='/the_team' />
        <PublicRoute {...props} restricted = {false} exact component={TheMatches} path='/the_matches' />
        <PublicRoute {...props} restricted = {false} exact component={Home} path='/' />
        <PublicRoute {...props} restricted = {false} exact component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default Routes;
