import React from 'react';
import { Backdrop, StyledModal } from './Modal.styled';

export class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', e => {
      if (e.code === 'Escape') {
        this.props.toggleModal();
        console.log('message');
      }
    });
  }

  render() {
    const { largeImage, toggleModal } = this.props;
    return (
      <Backdrop className="overlay" onClick={toggleModal}>
        <StyledModal className="modal">
          <img src={largeImage} alt="LargeImage" />
        </StyledModal>
      </Backdrop>
    );
  }
}
