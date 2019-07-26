import React, { Component } from 'react';
import ImageSelector from '../../cmsComponents/ImageSelector/ImageSelector';
import './formContainer.scss'
import { Redirect } from 'react-router-dom';

const style = {
  display: 'flex',
  flexDirection: 'column',
};

export default class FormContainer extends Component {
  constructor() {
    super();
    this.state = {
      respond: '',
      article: {
        title: '',
        description: '',
        content: '',
        author: '',
      },
      gallery: {
        thumbnailImageName: '',
        articleId: '',
        images: [

        ]
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
  }

  handleChangeFile(event) {
    this.setState({gallery: {...this.state.gallery, images: event.target.files}});
  }

  handleChange(event) {
    this.setState({ article: {...this.state.article, [event.target.name]: event.target.value } });
  }

  handleSubmit(event) {
    event.preventDefault();
    const method = 'POST';
    const { article } = this.state;
    const { title, description, content } = article;
    const body = JSON.stringify({ title, description, content, author: localStorage.getItem('username') });
    fetch('http://localhost:8000/article', { body, method }).then(
      res => res.json(),
    ).then(
      (data) => {
        this.setState({
          respond: data,
          gallery: {
            ...this.state.gallery,
            articleId: data.id,
            galleryId: data.gallery.id
          }
        });
        const { images, thumbnailImageName, articleId, galleryId } = this.state.gallery;
        console.log(this.state.gallery);
        let formData = new FormData();
        formData.append('articleId', articleId);
        formData.append('galleryId', galleryId);
        formData.append('thumbnailImageName', thumbnailImageName === '' ? images[0].name : thumbnailImageName);
        Array.from(images).forEach((image) => {
          formData.append('images', image)
        });
        fetch('http://localhost:8000/article/gallery', {body: formData, method}).then(res => this.setState({respond: res}));
        },
    );
  }

  handleThumbnailChoose = (e) => {
    e.preventDefault();
    this.setState({lastClickedElement: e.target});

    const { lastClickedElement } = this.state;
    const className = 'selected-thumbnail';
    lastClickedElement && lastClickedElement !== e.target
      ? lastClickedElement.classList.remove(className)
      : null;
    e.currentTarget.classList.toggle(className);

    const elemAlt = e.currentTarget.alt;

    const images = e.currentTarget.parentElement.getElementsByClassName('articleCreator-image');
    const imagesArr = Array.from(images);
    imagesArr.filter((image) => {
      if(image.alt === elemAlt){
        this.setState({gallery: {...this.state.gallery, thumbnailImageName: elemAlt}})
      }
    })
  };

  render() {
    const { article, gallery, respond } = this.state;
    const { title, content, description } = article;
    const { images } = gallery;
    const { articleId } = respond;
    return (
      <div className="imageCreator">
        {respond.status === 201 ? <Redirect push to="/admin" />: null}
        <form id="article-form" onSubmit={this.handleSubmit} ref={(el) => { this.form = el; }}>
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
          <label htmlFor="images">
            <input
              name="images"
              id="images-input"
              type="file"
              onChange={this.handleChangeFile}
              multiple
            />
          </label>
          <div className="articleCreator-images">
            { images[0]
              ? <ImageSelector
                images={images}
                onThumbnailImageChange={this.handleThumbnailChoose.bind(this)}/>
              : null }
          </div>
          <label htmlFor="submit">
            <input name="submit" type="submit" value="createArticle" />
          </label>
        </form>
      </div>
    );
  }
}
