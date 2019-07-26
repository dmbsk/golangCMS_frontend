import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Parser from 'html-react-parser';

import './singleArticleSmall.scss';

const SingleArticleSmall = (props) => {
  const {
    title, description, date, gallery, id
  } = props;
  const { thumbnailLink } = gallery;
  console.log(gallery)
  const linkToArticle = `/article/${id}/`;
  const linkToThumbnail = `http://${window.location.hostname}:8000${thumbnailLink}`;
  const bgImage = {backgroundImage: `url(${linkToThumbnail})`};
  return (
    <Link to={linkToArticle} className="article">
      <div className="article-thumbnail">
        <img src={linkToThumbnail} />
      </div>
      <div className="article-text">
        <h4>{title}</h4>
        <p className="description">{Parser(description)}</p>
        <p className="date">{(new Date(date)).toLocaleDateString("en-US")}</p>
      </div>
    </Link>
  );
};

// SingleArticle.propTypes = {
//   title: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   date: PropTypes.string.isRequired,
//   gallery: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     articleId: PropTypes.string.isRequired,
//     imageLinks: PropTypes.arrayOf(PropTypes.string()).isRequired,
//     thumbnailLinks: PropTypes.string.isRequired,
//   }).isRequired,
//   id: PropTypes.string.isRequired,
// };


export default SingleArticleSmall;
