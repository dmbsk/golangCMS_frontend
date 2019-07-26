import React from 'react';
import './singleArticle.scss';
import DeleteArticleButton from '../../components/cmsComponents/DeleteArticleButton/DeleteArticle';
import { Redirect } from 'react-router-dom';
import Parser from 'html-react-parser';

class SingleArticle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      article: null,
      respond: {},
    };
  }

  componentDidMount() {
    const method = 'GET';
    const { id } = this.props.match.params;
    const link = `http://localhost:8000/article/${id}`;
    fetch(link, { method }).then(
      res => res.json(),
    ).then(
      (data) => {
        this.setState({ article: data });
      },
    );
    return null;
  }

  deleteArticle = () => {
    const method = 'DELETE';
    const { article } = this.state;
    const body = JSON.stringify(article, null, '\n');
    console.log(body);
    fetch('http://localhost:8000/article', { body, method }).then(
      res => this.setState({respond: res}),
    );
  };

  render() {
    const { article, respond } = this.state;
    const isAuthorized = ['writer', 'moderator', 'admin'].indexOf(localStorage.getItem('userRole')) !== -1;
    if (article && (article.isPublic || isAuthorized) ) {
      const images = article.gallery.imagesLinks.map(imageLink => (
        <img alt="" src={`http://localhost:8000${imageLink}`} key={imageLink}/>
      ));
      return (
        <div className="article-full">
          {respond.status === 200 ? <Redirect push to="/articles" /> : null}
          <div className="article-full-text">
            <h1>{article.title}</h1>
            <p>{Parser(article.content.replace(/\n/g, '<br>'))}</p>
          </div>
          <div className="article-full-images">
            {images}
          </div>
          <div className="article-date">
            <p>{(new Date(article.date)).toLocaleDateString("en-US")}</p>
            <p>{article.author}</p>
          </div>
          {['moderator', 'admin'].indexOf(localStorage.getItem('userRole')) !== -1
            ? <DeleteArticleButton handleDeleteArticle={this.deleteArticle.bind(this)} />
            : null
          }
        </div>
      );
    }
    return (
      <div className="article-full">
        <h1>Article is currently unavailable</h1>
        <h3>Sorry :(</h3>
      </div>
        );
  }
}


export default SingleArticle;
