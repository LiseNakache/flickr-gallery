import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Image from '../Image';
import Lightbox from 'react-image-lightbox';
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
      chosenItem:0,
      isOpen: false,
      largeImage:[]
    };
    this.deleteImage = this.deleteImage.bind(this);
    this.urlFromDto = this.urlFromDto.bind(this);
    this.openLightBox = this.openLightBox.bind(this);
    // this.imageBigSize=this.imageBigSize.bind(this)
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
    const getImagesUrl = `services/rest/?method=flickr.photos.search&api_key=522c1f9009ca3609bcbaf08545f067ad&tags=${tag}&tag_mode=any&per_page=100&format=json&nojsoncallback=1`;
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

    
//Function that renders the large size of the image (size : _b) 
//To use if we want the lightbox to show a large image of the normal image
  // imageBigSize() {
  //   const getImagesUrl = `services/rest/?method=flickr.photos.getSizes&api_key=522c1f9009ca3609bcbaf08545f067ad&photo_id=${this.props.dto.id}&format=json&nojsoncallback=1`;
  //   const baseUrl = 'https://api.flickr.com/';
  //   axios({
  //     url: getImagesUrl,
  //     baseURL: baseUrl,
  //     method: 'GET'
  //   })
  //   .then((response) => {
  //   this.setState({largeImage:this.state.largeImage.concat(response.data.sizes.size[8].source)})
  //   })
     
  // }




  //Delete: clicking the delete button should remove the image from the display.
  deleteImage(id_image) {
    this.setState({
      images: this.state.images.filter((_, i) => i !== id_image)
    });
  }


  //Get images 
  componentDidMount() {
    this.getImages(this.props.tag);
    this.setState({
      galleryWidth: document.body.clientWidth
    });
  }

  //compare the current and next tag
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

  //dto = item in the image array
  render() {
    console.log(this.state.images)
    const { photoIndex, isOpen } = this.state;
    return (
      <div id="gallery" className="gallery-root">
        {this.state.images.map((dto, index) => {
          return <Image key={'image-' + dto.id} url={this.urlFromDto(dto)} index={index} galleryWidth={this.state.galleryWidth} deleteImage={this.deleteImage} openLightBox={this.openLightBox} />;
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
                zoomInLabel='aria-label'
                zoomOutLabel='aria-label'
              />
            )}
           
      </div>
    );
  }
}

export default Gallery;
