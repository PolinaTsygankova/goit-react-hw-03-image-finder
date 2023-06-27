import React from 'react';
// import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from './../ImageGalleryItem/ImageGalleryItem';
import { Modal } from './../Modal/Modal';

export class ImageGallery extends React.Component {
  state = {
    showModal: false,
    largeImage: '',
  };

  toggleModal = e => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  getLargeImgForModal = largeImage => {
    this.setState({
      largeImage: largeImage,
    });
  };

  render() {
    const { images } = this.props;
    const { largeImage, showModal } = this.state;

    return (
      <>
        {images === [] && toast('Wow so easy!')}
        {images && (
          <Gallery className="gallery">
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                smallImg={webformatURL}
                largeImg={largeImageURL}
                tags={tags}
                toggleModal={this.toggleModal}
                getLargeImgForModal={this.getLargeImgForModal}
              />
            ))}
          </Gallery>
        )}
        {showModal && (
          <Modal largeImage={largeImage} toggleModal={this.toggleModal} />
        )}
      </>
    );
  }
}

// {
//   /* // ImageGallery.propTypes = { */
// }
// {
//   /* images: PropTypes.array, */
// }
// {
//   /* status: PropTypes.string.isRequired, */
// }
// {
//   /* showModal: PropTypes.bool.isRequired, */
// }
// {
//   /* isButtonExist: PropTypes.bool.isRequired, */
// }
