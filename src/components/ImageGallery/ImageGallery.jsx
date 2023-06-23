import React from 'react';
import { ImageGalleryItem } from './../ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends React.Component {
  state = {
    images: null,
    errorMessage: '',
    currentPage: 1,
    isButtonExist: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props !== prevProps ||
      this.state !== prevState ||
      this.state.currentPage !== prevProps.currentPage
    ) {
      fetch(
        `https://pixabay.com/api/?q=${this.props.textQuery}&page=${this.state.currentPage}&key=35869427-65f66342165db7316d77cd90d&image_type=photo&orientation=horizontal&per_page=12`
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
            isButtonExist: this.state.currentPage < Math.ceil(res.total / 12),
          });
        })
        .catch(error => {
          this.setState({ errorMessage: error.message });
        });
    }
  }

  incrementPageNumber = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));

    if (this.state.isButtonExist === true) {
      this.setState(prevState => ({
        images: [...prevState.images, ...this.state.images],
      }));
    }
  };

  render() {
    const { images, isButtonExist } = this.state;

    return (
      <>
        {images && (
          <ul className="gallery">
            {images.map(({ id, webformatURL, largeImageURL, tags }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  smallImg={webformatURL}
                  lardeImg={largeImageURL}
                  tags={tags}
                />
              );
            })}
          </ul>
        )}
        {isButtonExist && (
          <button onClick={this.incrementPageNumber}>Load more</button>
        )}
      </>
    );
  }
}