import React from 'react';
import {Link} from 'react-router-dom';
import './adminArticleTable.scss';
import EditorArticle from "../../../../pages/EditorArticle/EditorArticle";
import {BrowserRouter as Router, Route} from 'react-router-dom';


class AdminArticleTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: null,
    };
  }

  componentDidMount() {
    const method = 'GET';
    fetch('http://localhost:8000/article', {method}).then(
      res => res.json(),
    ).then(
      (data) => {
        this.setState({
            articles: data.sort((a, b) => {
              const dateA = new Date(a.date).getTime();
              const dateB = new Date(b.date).getTime();
              const logic = dateA < dateB ? 1 : 0;
              return dateA > dateB ? -1 : logic;
            }),
          }
        );
      });
  };

  deleteArticle = (index) => {
    const method = 'DELETE';
    const {articles} = this.state;
    console.log(articles);
    const article = articles[index];
    console.log(index);
    const body = JSON.stringify(article, null, '\n');
    console.log(body);
    fetch('http://localhost:8000/article', {body, method}).then(
      res => this.setState({respond: res}),
    );
    articles.splice(index, 1);
    this.setState({articles});
  };

  render() {
    const userRole = localStorage.getItem('userRole');
    const isAuthoryzed = ['moderator', 'admin'].indexOf(userRole) !== -1;
    const {articles} = this.state;
    const articleItems = articles ? articles.map((article, index) => {
      const {
        gallery, title, description, isPublic, author, date, id
      } = article;
      const {thumbnailLink} = gallery;
      const imageStyles = thumbnailLink ? {
        backgroundImage: `url(http://localhost:8000${thumbnailLink})`,
        backgroundSize: 'cover',
        backgroundPosition: '50% 50%',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100%',
      } : null;

      return (
        <div className="grid-item" key={id} data-index={index}>
          <div className="grid-thumbnail-image">
            <div style={imageStyles}/>
          </div>
          <div className='grid-controls'>
            <Link className="grid-control-edit" to={{
              pathname: `editArticle/${id}`,
              article
            }}
            >edit</Link>
            {
              isAuthoryzed ?
                <a className="grid-control-delete" data-index={index} onClick={(e) => {
                  const clickedIndex = e.target.getAttribute('data-index');
                  this.deleteArticle(clickedIndex)
                }}>delete</a>
                : null
            }
          </div>
          <div className="grid-header"><h3><Link to={`article/${id}`}>{title}</Link></h3></div>
          <div className="grid-description">{description}</div>
          <div className="grid-is-public">{isPublic ? <p>Yes</p> : <p>No</p>}</div>
          <div className="grid-author"><h3>{author}</h3></div>
          <div className="grid-date">
            <p>{new Date(date).toLocaleDateString('en-US')}</p>
            <p>{new Date(date).toLocaleTimeString()}</p>
          </div>
        </div>
      );
    }) : null;

    return (
      <div className="admin-table not-center">
        <div className="admin-grid admin-grid-title">
          <div className="grid-thumbnail"><h3>thumbnail image</h3></div>
          <div className="grid-header"><h3>title</h3></div>
          <div className="grid-description"><h3>description</h3></div>
          <div className="grid-is-public"/>
          <div className="grid-author"><h3>author</h3></div>
          <div className="grid-date"><h3>date</h3></div>
        </div>
        {articleItems}
      </div>
    );
  }
}

export default AdminArticleTable;
