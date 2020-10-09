import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Navbar from './navbar/Navbar';
import AboutPageView from './pages/About/About';
import RecipeHomePageView from './pages/Recipes/Recipes';
import Login from './pages/User/login';
import Signup from './pages/User/Signup';
import ShareRecipe from './pages/Share-A-Recipe/Share-Recipe';
import profilePage from './pages/User/profilePage';

function App() {
  return (
    <Router>
    <div>
      <Navbar />
      <Switch>
        <Route path="/" component={RecipeHomePageView} exact />
        <Route path="/share-recipe" component={ShareRecipe} />
        <Route path="/about" component={AboutPageView} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/profile" component={profilePage} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
