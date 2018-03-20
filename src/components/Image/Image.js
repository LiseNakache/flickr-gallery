import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Lightbox from 'react-image-lightbox';
import FontAwesome from 'react-fontawesome';
import './Image.scss';

class Image extends React.Component {
  static propTypes = {
    dto: PropTypes.object,
    galleryWidth: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.state = {
      size: 200,
      rotation: 0,
      sizeImage:[1],
    };
    this.calcImageSize = this.calcImageSize.bind(this);
    this.deleteImage= this.deleteImage.bind(this)
    this.rotateImage= this.rotateImage.bind(this)
    this.openLightBox=this.openLightBox.bind(this)
    // this.addImage=this.addImage.bind(this)
    // this.imageBigSize=this.imageBigSize.bind(this)
    
  }

  calcImageSize() {
    // console.log(this.props.galleryWidth)
    const {galleryWidth} = this.props;
    const targetSize = 200;
    const imagesPerRow = Math.round(galleryWidth / targetSize);
    const size = (galleryWidth / imagesPerRow);
    this.setState({size});
    
  }

  componentDidMount() {
    this.calcImageSize();
    // this.imageBigSize();
    // this.addImage(this.props.dto)
  }

  //https://www.flickr.com/services/api/misc.urls.html
  // urlFromDto(dto) {
  //   return `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`;
  // }

  // addImage(dto){
  //   var imageUrl = `https://farm${dto.farm}.staticflickr.com/${dto.server}/${dto.id}_${dto.secret}.jpg`
  //   console.log(this.state.images.concat([imageUrl]))
  //   this.setState({images : this.state.images.concat(imageUrl) },()=> console.log(this.state.images))
  //    this.setState(prevState => ({
  //     images : prevState.images.concat(imageUrl)
  //    }))
    

  //   // this.setState((prevState) => {
  //   //   return {images: prevState.images.concat(12)};
  //   // },()=> console.log(this.state.images));
  // }

  deleteImage() {
    this.props.deleteImage(this.props.index)
  }

  
  rotateImage() {
    let newRotation = this.state.rotation + 90;
      if(newRotation >= 360) {newRotation = 0;}
      this.setState({rotation: newRotation,})
      // console.log(this.state)
      // console.log("the rotate button works")
  }


  //click the button --> increase the size of the image 
  //inscrease the size with size state
  // imageBigSize() {
  //   const getImagesUrl = `services/rest/?method=flickr.photos.getSizes&api_key=522c1f9009ca3609bcbaf08545f067ad&photo_id=${this.props.dto.id}&format=json&nojsoncallback=1`;
  //   const baseUrl = 'https://api.flickr.com/';
  //   axios({
  //     url: getImagesUrl,
  //     baseURL: baseUrl,
  //     method: 'GET'
  //   })
  //   .then((response) => {
  //   //console.log(response.data.sizes.size)
  //   this.setState({sizeImage:this.state.sizeImage.concat(response.data.sizes.size[8].source)})
  //   //console.log(this.state.sizeImage)
  //   })
     
  // }

  openLightBox(){
    this.props.openLightBox(this.props.index)
  }

  render() {

    return (

      <div
        className="image-root"
        id="image"
        style={{
          backgroundImage: `url(${this.props.url})`,
          width: this.state.size + 'px',
          height: this.state.size + 'px',
          transform: `rotate(${this.state.rotation}deg)`,
          
        }}
        >
     
        <div style={{
          transform: `rotate(-${this.state.rotation}deg)`,
        }}>
          <FontAwesome className="image-icon" name="sync-alt" title="rotate" onClick={this.rotateImage}/>
          <FontAwesome className="image-icon" name="trash-alt" title="delete" onClick={this.deleteImage}/>
          <FontAwesome className="image-icon" name="expand" title="expand" onClick={this.openLightBox} />
        </div>

      </div>
    );
  }
}


export default Image;
