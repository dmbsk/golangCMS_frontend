import React from 'react';
import './articles.scss';
import { Link } from 'react-router-dom';
import ArticlesContainer from '../../components/containers/ArticlesContainer/ArticlesContainer';

const Articles = () => {
  const isAdmin = (localStorage.getItem('isAdmin') === 'true');
  return (
    <div className="articles-root not-center">
      <div className="articles">
        <ArticlesContainer />
      </div>
    </div>
  );
}


export default Articles;
