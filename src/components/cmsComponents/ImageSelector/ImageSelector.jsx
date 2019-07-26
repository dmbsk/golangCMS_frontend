import React from 'react';
import './imageSelector.scss';

class ImageSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imagesMap: [],
    };
  }

  componentDidMount() {
    const { images } = this.props;
    this.createImageArray(images);
  }

  createImageArray(images) {
    const imagesArr = Array.from(images);
    imagesArr.map((image, index) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const { imagesMap } = this.state;
        imagesMap.push({
          src: e.target.result,
          index,
        });
        this.setState({ imagesMap });
      };
      reader.readAsDataURL(image);
    });
  }

  render() {
    const { imagesMap } = this.state;
    const { images } = this.props;
    const imagesHtml = imagesMap
      ? imagesMap.map(image => (
        <img
          key={images[image.index].name}
          alt={images[image.index].name}
          src={image.src}
          onClick={event => this.props.onThumbnailImageChange(event)}
          className="articleCreator-image"
        />
      ))
      : null;
    console.log(this.state);
    return imagesHtml || null;
  }
}

export default ImageSelector;
