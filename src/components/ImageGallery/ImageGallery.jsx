import React from 'react';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from './../ImageGalleryItem/ImageGalleryItem';
import { Button } from './../Button/Button';
import { Loader } from '../Loader.jsx/Loader';
import { Modal } from './../Modal/Modal';

const STATUS = {
  IDLE: 'idle',
  PENDING: 'pending',
  REJECTED: 'rejected',
  RESOLVED: 'resolved',
};

const INITIAL_STATE = {
  images: null,
  errorMessage: '',
  currentPage: 1,
  showModal: false,
  status: STATUS.IDLE,
  largeImage: '',
  isButtonExist: false,
};

export class ImageGallery extends React.Component {
  state = INITIAL_STATE;

  componentDidUpdate(prevProps, prevState) {
    const { textQuery } = this.props;
    const { currentPage } = this.state;

    if (prevProps.textQuery !== textQuery) {
      this.setState({
        ...INITIAL_STATE,
      });
      this.setState({
        status: STATUS.PENDING,
      });
    }

    if (
      this.props !== prevProps ||
      this.state !== prevState ||
      currentPage !== prevProps.currentPage
    ) {
      fetch(
        `https://pixabay.com/api/?q=${textQuery}&page=${currentPage}&key=35869427-65f66342165db7316d77cd90d&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          }

          throw new Error('Something goes wrong');
        })
        .then(res => {
          this.setState({
            images: res.hits,
            isButtonExist: currentPage < Math.ceil(res.total / 12),
            status: STATUS.RESOLVED,
          });
        })
        .catch(error => {
          this.setState({
            errorMessage: error.message,
            status: STATUS.REJECTED,
          });
        });
    }
  }

  incrementPageNumber = () => {
    const { images } = this.state;
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));

    this.setState(prevState => ({
      images: [...images, ...prevState.images],
    }));
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
    const { images, status, showModal, largeImage, isButtonExist } = this.state;

    if (status === STATUS.PENDING) return <Loader />;
    else if (status === STATUS.RESOLVED)
      return (
        <>
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
              {showModal && (
                <Modal largeImage={largeImage} toggleModal={this.toggleModal} />
              )}
            </Gallery>
          )}
          {isButtonExist && (
            <Button incrementPageNumber={this.incrementPageNumber} />
          )}
        </>
      );
    else if (status === STATUS.REJECTED) return alert('Error');
  }
}
