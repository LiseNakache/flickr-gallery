import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Image from '../Image';
import './Gallery.scss';

class Gallery extends React.Component {
  static propTypes = {
    tag: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      galleryWidth: this.getGalleryWidth(),

    };
    this.deleteImage=this.deleteImage.bind(this);
    // this.rotateImage=this.rotateImage.bind(this);
  }

  //width of the computer screen 
  getGalleryWidth(){
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
    const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&per_page=100&format=json&nojsoncallback=1`;
    const baseUrl = 'https://api.flickr.com/';
    axios({
      url: getImagesUrl,
      baseURL: baseUrl,
      method: 'GET'
    })
      .then(res => (res.data))
      // console.log(res.data))
      .then(res => {
        if (
          res &&
          res.photos &&
          res.photos.photo &&
          res.photos.photo.length > 0
        ) {
          this.setState({images: res.photos.photo});
        }
      });
  }

  //Delete: clicking the delete button should remove the image from the display. (easy)
  deleteImage(id_image) {
    // console.log('the delete button works')
    // console.log(this.state)
    this.setState ({ images: this.state.images.filter((_, i) => i !== id_image)
     }) ;
  //    console.log(this.state)
  // console.log(id_image)
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

  //dto = item , the item is res.photos.photo[i]
  render() {
    return (
      <div className="gallery-root">
        {this.state.images.map((dto,index) => {
          return <Image key={'image-' + dto.id} dto={dto} index={index} galleryWidth={this.state.galleryWidth} deleteImage={this.deleteImage}/>;
        })}
      </div>
    );
  }
}

export default Gallery;
