import React from 'react';
import PropTypes from 'prop-types';
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
    };
    this.calcImageSize = this.calcImageSize.bind(this);
    this.deleteImage= this.deleteImage.bind(this)
    this.rotateImage= this.rotateImage.bind(this)
    this.openLightBox=this.openLightBox.bind(this)  
  }

  calcImageSize() {
    const {galleryWidth} = this.props;
    const targetSize = 200;
    const imagesPerRow = Math.round(galleryWidth / targetSize);
    const size = (galleryWidth / imagesPerRow);
    this.setState({size});
  }

  componentDidMount() {
    this.calcImageSize();
  }


  //link the index of the image with the deleteImage function(in the Gallery)
  deleteImage() {
    this.props.deleteImage(this.props.index)
  }

  //rotate the image when clicking the "rotate" button
  rotateImage() {
    let newRotation = this.state.rotation + 90;
      if(newRotation >= 360) {newRotation = 0;}
      this.setState({rotation: newRotation,})

  }

  //link the index of the image with the lightBox(in the Gallery)
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
