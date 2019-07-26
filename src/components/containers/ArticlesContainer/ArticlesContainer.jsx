import React from 'react';
import SingleArticleSmall from '../../clientComponents/SingleArticleSmall/SingleArticleSmall';

class ArticlesContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
    };
  }

  componentDidMount() {
    const method = 'GET';
    fetch('http://localhost:8000/article', { method }).then(
      res => res.json(),
    ).then(
      (data) => {
        this.setState({ articles: data.filter(article => (article.isPublic)) });
      },
    );
  }

  render() {
    const { articles } = this.state;
    let articlesMap = null;
    if (articles) {
      articlesMap = articles.map((article) => {
        const {
          date, description, id, title, gallery,
        } = article;
        return (
          <SingleArticleSmall
            key={id}
            articleKey={id}
            date={date}
            description={description}
            id={id}
            title={title}
            gallery={gallery}
          />
        );
      });
    }
    console.log(articlesMap);
    articlesMap.sort((a, b) => {
      const dateA = new Date(a.props.date).getTime();
      const dateB = new Date(b.props.date).getTime();
      const logic = dateA < dateB ? 1 : 0;
      return dateA > dateB ? -1 : logic;
    });
    console.log(articlesMap);
    return articlesMap || <h1>There is no any articles :(</h1>;
  }
}


export default ArticlesContainer;
