import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Lightbox from 'react-images';
import FontAwesome from 'react-fontawesome';
import './Image.scss';

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    galleryWidth: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.calcImageSize = this.calcImageSize.bind(this);
    this.state = {
      size: 200,
      rotation: 0,
      sizeImage:[],
      lightboxIsOpen : false
    };
    this.deleteImage= this.deleteImage.bind(this)
    this.rotateImage= this.rotateImage.bind(this)
    this.imageBigSize=this.imageBigSize.bind(this)
  }

  calcImageSize() {
    const {galleryWidth} = this.props;
    const targetSize = 200;
    const imagesPerRow = Math.round(galleryWidth / targetSize);
    const size = (galleryWidth / imagesPerRow);
    this.setState({
      size
    });
  }

  componentDidMount() {
    this.calcImageSize();
  }

  //https://www.flickr.com/services/api/misc.urls.html
  urlFromDto(dto) {
    return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  }

  deleteImage() {
    console.log(this.props.index)
    this.props.deleteImage(this.props.index)
  }

  //implement the id image on the rotateImage function. 
  rotateImage() {
    let newRotation = this.state.rotation + 90;
      if(newRotation >= 360) {newRotation =- 360;}
      this.setState({rotation: newRotation,})
      console.log(this.state)
      console.log("the rotate button works")
  }


  //click the button --> increase the size of the image 
  //inscrease the size with size state
  imageBigSize(dto) {
    const getImagesUrl = `services/rest/?method=flickr.photos.getSizes&api_key=522c1f9009ca3609bcbaf08545f067ad&photo_id=${this.props.dto.id}&format=json&nojsoncallback=1`;
    const baseUrl = 'https://api.flickr.com/';
    axios({
      url: getImagesUrl,
      baseURL: baseUrl,
      method: 'GET'
    })
    .then((response) => {
      this.state.lightboxIsOpen=true
    //console.log(response.data.sizes.size)
    this.setState({sizeImage:this.state.sizeImage.concat(response.data.sizes.size[8].source)})
    console.log(this.state.sizeImage)
    })
     
  }

  //I have to rotate the image without rotationg the buttons
  // rotate only the image based on the id ?
  // 
  render() {
    //console.log(this.props.dto);
    return (
      <div>
      <div
        className="image-root"
        style={{
          backgroundImage: `url(${this.urlFromDto(this.props.dto)})`,
           width: this.state.size + 'px',
          height: this.state.size + 'px',
          //transform: `rotate(${this.state.rotation}deg)`,
        }}
        >
        <div>
          <FontAwesome className="image-icon" name="sync-alt" title="rotate" onClick={this.rotateImage}/>
          <FontAwesome className="image-icon" name="trash-alt" title="delete" onClick={this.deleteImage}/>
          <FontAwesome className="image-icon" name="expand" title="expand" onClick={this.imageBigSize}/>
        </div>
      </div>
      {/* <Lightbox
      images= {this.state.sizeImage}
      isOpen={this.state.lightboxIsOpen}
        onClickPrev={this.gotoPrevious}
        onClickNext={this.gotoNext}
        onClose={this.closeLightbox}
        /> */}
      </div>
      
    );
  }
}

export default Image;
