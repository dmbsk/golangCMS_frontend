import React, { Component } from 'react';
import './editArticle.scss';
import { Redirect } from 'react-router-dom';

const style = {
  display: 'flex',
  flexDirection: 'column',
};

export default class EditorArticle extends Component {
  constructor() {
    super();
    this.state = {
      respond: '',
      article: {
        id: '',
        title: '',
        description: '',
        content: '',
        isPublic: false,
      },
      gallery: {
        thumbnailImageIndex: 0,
        articleId: '',
        images: [],
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.handleChangeRadio = this.handleChangeRadio.bind(this);
  }

  handleChangeFile(event) {
    this.setState({ gallery: { ...this.state.gallery, images: event.target.files } });
  }

  handleChange(event) {
    this.setState({ article: { ...this.state.article, [event.target.name]: event.target.value } });
  }

  handleChangeRadio() {
    const newCheckedValue = !this.state.article.isPublic;
    this.setState({ article: { ...this.state.article, isPublic: newCheckedValue } });
  }

  handleSubmit(event) {
    event.preventDefault();
    const method = 'PUT';
    const { article } = this.state;
    const body = JSON.stringify(article);
    fetch('http://localhost:8000/article', { body, method }).then(
      (respond) => {
        respond.json();
        this.setState({
          respond,
        });
      },
    );
  }

  // handleThumbnailChoose = (e) => {
  //   e.preventDefault();
  //   this.setState({lastClickedElement: e.target});
  //
  //   const { lastClickedElement } = this.state;
  //   const className = 'selected-thumbnail';
  //   lastClickedElement && lastClickedElement !== e.target
  //     ? lastClickedElement.classList.remove(className)
  //     : null;
  //   e.target.classList.toggle(className);
  //
  //   const images = e.target.parentElement.getElementsByClassName('articleCreator-image');
  //   const imagesArr = Array.from(images);
  //   imagesArr.filter((image, index) => {
  //     image.classList.contains(className)
  //       ? this.setState({ gallery: {...this.state.gallery, thumbnailImageIndex: index }})
  //       : null
  //   });
  // };

  componentDidMount() {
    this.setState({
      article: this.props.location.article,
    });
  }

  render() {
    const userRole = localStorage.getItem('userRole');
    const isAuthoryzed = ['moderator', 'admin'].indexOf(userRole) !== -1;
    const { article, respond } = this.state;
    if (article) {
      const {
        title, content, description, isPublic,
      } = article;
      return (
        <div className="imageCreator">
          {respond.status === 200 ? <Redirect push to="/admin" /> : null}
          <form
            id="article-form"
            onSubmit={this.handleSubmit}
            ref={(el) => {
              this.form = el;
            }}
          >
            <label htmlFor="title">
              Title:
              <input
                name="title"
                id="title-input"
                onChange={this.handleChange}
                value={title}
                required
              />
            </label>
            <label htmlFor="description">
              Description:
              <textarea
                name="description"
                id="description-input"
                onChange={this.handleChange}
                value={description}
                required
              />
            </label>
            <label htmlFor="content">
              content
              <textarea
                name="content"
                id="content-input"
                onChange={this.handleChange}
                value={content}
              />
            </label>
            {
              isAuthoryzed
                ? (
                  <label htmlFor="isPublic">
                    public
                    <div>
                      <input
                        name="isPublic"
                        id="content-isPublicYes"
                        onChange={this.handleChangeRadio}
                        type="radio"
                        checked={isPublic}
                      />
                      Yes
                      <input
                        name="isPublic"
                        id="content-isPublicNo"
                        onChange={this.handleChangeRadio}
                        type="radio"
                        checked={!isPublic}
                      />
                      No
                    </div>
                  </label>
                )
                : null
            }
            {/* <label htmlFor="images"> */}
            {/* <input */}
            {/* name="images" */}
            {/* id="images-input" */}
            {/* type="file" */}
            {/* onChange={this.handleChangeFile} */}
            {/* multiple */}
            {/* /> */}
            {/* </label> */}
            <label htmlFor="submit">
              <input name="submit" type="submit" value="createArticle" />
            </label>
          </form>
        </div>
      );
    }
    return (
      <div>Props failed to pass</div>
    );
  }
}
