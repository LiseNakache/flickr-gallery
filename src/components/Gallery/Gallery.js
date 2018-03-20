import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
//import InfiniteScroll from 'react-infinite-scroller';
import Image from '../Image';
import Lightbox from 'react-image-lightbox';
import './Gallery.scss';
// var InfiniteScroll = require('react-infinite-scroll-component');

class Gallery extends React.Component {
  static propTypes = {
    tag: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      galleryWidth: this.getGalleryWidth(),
      chosenItem:0,
      // photoIndex: (this.props.index),
      isOpen: false,
    };
    this.deleteImage = this.deleteImage.bind(this);
    this.urlFromDto = this.urlFromDto.bind(this);
    this.openLightBox = this.openLightBox.bind(this);
  }

  //width of the computer screen 
  getGalleryWidth() {
    try {
      return document.body.clientWidth;
    } catch (e) {
      return 1000;
    }
  }

  //flickr.photos.search : https://www.flickr.com/services/api/flickr.photos.search.html
  //https://www.flickr.com/services/api/flickr.photos.getSizes.html
  //https://www.flickr.com/services/api/flickr.photos.transform.rotate.html
  getImages(tag) {
    const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&per_page=3&format=json&nojsoncallback=1`;
    const baseUrl = 'https://api.flickr.com/';
    axios({
      url: getImagesUrl,
      baseURL: baseUrl,
      method: 'GET'
    })
      .then(res => res.data)
      .then(res => {
        if (
          res &&
          res.photos &&
          res.photos.photo &&
          res.photos.photo.length > 0
        ) {
          
          this.setState({ images: res.photos.photo });
          
        }
      });
  }

  //Delete: clicking the delete button should remove the image from the display. (easy)
  deleteImage(id_image) {
    this.setState({
      images: this.state.images.filter((_, i) => i !== id_image)
    });
    console.log("the delete " + this.state.images)
  }


  //Get images 
  componentDidMount() {
    this.getImages(this.props.tag);
    this.setState({
      galleryWidth: document.body.clientWidth
    });
  }

  //React will call this method even if the props have not changed, so make sure to compare the current and next values
  //Check the tag
  componentWillReceiveProps(props) {
    this.getImages(props.tag);
  }

  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }

  openLightBox(idImage){
    this.setState({chosenItem : idImage},()=> console.log("the chosen item is " +this.state.chosenItem))
    this.setState({ isOpen: true })
  }

  //dto = item , the item is res.photos.photo[i]
  render() {
    // console.log("id item " + this.state.images[0])
    // console.log(":" + this.urlFromDto(this.state.images[[ 2 % this.state.images.length]] ))
    const { photoIndex, isOpen } = this.state;
    return (
      <div id="gallery" className="gallery-root">
        {this.state.images.map((dto, index) => {
          return <Image key={'image-' + dto.id} url={this.urlFromDto(dto)} index={index} galleryWidth={this.state.galleryWidth} deleteImage={this.deleteImage} image={this.state.images} openLightBox={this.openLightBox} />;
        })}

            {isOpen && (
              <Lightbox
              mainSrc={this.urlFromDto(this.state.images[this.state.chosenItem])}
              nextSrc={this.urlFromDto(this.state.images[[ (this.state.chosenItem + 1) % this.state.images.length]])}
              prevSrc={this.urlFromDto(this.state.images[[ (this.state.chosenItem + (this.state.images.length - 1)) % this.state.images.length]])}
              onCloseRequest={() => this.setState({ isOpen: false })}
              onMovePrevRequest={() =>
                this.setState({
                  chosenItem: (this.state.chosenItem + this.state.images.length - 1) % this.state.images.length,
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                   chosenItem: (this.state.chosenItem + 1) % this.state.images.length
                })}
                imageTitle={this.state.images[this.state.chosenItem].title}
              />
            )}
            {/* this.urlFromDto(this.state.images[(this.state.chosenItem+1)%this.state.images.length]) */}
      </div>
    );
  }
}

export default Gallery;
