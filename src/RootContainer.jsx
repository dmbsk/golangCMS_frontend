import React from 'react';
import './root.scss';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/clientComponents/Navbar/Navbar';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Articles from './pages/Articles/Articles';
import Login from './pages/Login/Login';
import Logout from './pages/Logout/Logout';
import SingleArticle from './pages/SingleArticle/SingleArticle';
import CreatorArticle from './pages/CreatorArticle/CreatorArticle';
import Admin from './pages/Admin/Admin';
import EditorArticle from './pages/EditorArticle/EditorArticle';
import Register from "./pages/Register/Register";

const rootContainer = () => (
  <Router className="rootContainer">
    <div className="left-marginer">
      <Navbar />

      <Route path="/" exact component={Home} />
      <Route path="/about/" component={About} />

      <Route path="/articles/" exact component={Articles} />
      <Route path="/article/:id" exact component={SingleArticle} />
      <Route path="/articleCreator" exact component={CreatorArticle} />
      <Route
        name="articleEditor"
        path="/editArticle/:articleId"
        component={EditorArticle}
      />

      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />

      <Route path="/register" component={Register} />

      <Route path="/admin" component={Admin} />
    </div>
  </Router>
);

export default rootContainer;
