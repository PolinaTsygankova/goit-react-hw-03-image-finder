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
  lardgImg: '',
};

export class ImageGallery extends React.Component {
  state = INITIAL_STATE;

  componentDidUpdate(prevProps, prevState) {
    const { textQuery } = this.props;
    const { currentPage } = this.state;

    if (prevProps.textQuery !== textQuery) {
      this.setState({
        INITIAL_STATE,
      });
      this.setState({
        status: STATUS.PENDING,
      });
    }
    if (
      this.props !== prevProps ||
      this.state !== prevState ||
      currentPage !== prevProps.currentPage
    )
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

  incrementPageNumber = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));

    // if (this.state.isButtonExist === true) {
    this.setState(prevState => ({
      images: [...prevState.images, ...this.state.images],
      isLoaderExist: true,
    }));
    // }
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

  getEvent = e => {
    console.dir(e.currentTarget);
  };

  render() {
    const { images, status, showModal, largeImage } = this.state;

    if (status === STATUS.PENDING) return <Loader></Loader>;
    else if (status === STATUS.RESOLVED)
      return (
        <>
          {/* <div onClick={this.getEvent}>=)</div> */}
          {images && (
            <Gallery className="gallery">
              {images.map(({ id, webformatURL, largeImageURL, tags }) => {
                this.setState({ largeImage });
                return (
                  <ImageGalleryItem
                    key={id}
                    smallImg={webformatURL}
                    largeImg={largeImageURL}
                    tags={tags}
                    toggleModal={this.toggleModal}
                    // onClick={this.getEvent}
                  />
                );
              })}
              {showModal && (
                <Modal largeImage={largeImage} toggleModal={this.toggleModal} />
                // console.log(largeImage)
              )}
            </Gallery>
          )}
          <Button incrementPageNumber={this.incrementPageNumber} />
        </>
      );
    else if (status === STATUS.REJECTED) return alert('Error');
  }
}
