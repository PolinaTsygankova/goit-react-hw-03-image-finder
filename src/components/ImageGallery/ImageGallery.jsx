import React from 'react';
import { ImageGalleryItem } from './../ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends React.Component {
  state = {
    images: null,
    errorMessage: '',
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.props !== prevProps) {
      fetch(
        `https://pixabay.com/api/?q=${this.props.textQuery}&page=1&key=35869427-65f66342165db7316d77cd90d&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(res => res.json())
        .then(res => {
          console.dir(res);
          if (res.status !== 'ok') {
            this.setState({ images: res });
          } else throw new Error('Something goes wrong');
        })
        .catch(error => {
          this.setState({ errorMessage: error.message });
        });
    }
  }

  render() {
    console.log(this.state.images);
    return (
      <>
        {this.state.images && (
          <ul className="gallery">
            {this.state.images.map(img => {
              console.log(img);
            })}
            {/* <ImageGalleryItem /> */}
          </ul>
        )}
      </>
    );
  }
}
