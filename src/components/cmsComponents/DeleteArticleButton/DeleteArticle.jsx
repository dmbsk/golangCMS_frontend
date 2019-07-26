import React from 'react';
import './deleteArticle.scss';

const deleteArticle = (props) => {
  const { handleDeleteArticle } = props;
  return (
    <button
      type="button"
      onClick={event => handleDeleteArticle(event)}
    >
      Delete this article
    </button>
  );
};

export default deleteArticle;
