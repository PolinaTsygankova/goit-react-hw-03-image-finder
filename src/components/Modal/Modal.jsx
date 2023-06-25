import PropTypes from 'prop-types';
import React from 'react';
import { Backdrop, StyledModal } from './Modal.styled';

export class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.toggleModal();
    }
  };

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

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
