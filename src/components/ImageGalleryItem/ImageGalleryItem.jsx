// import PropTypes from 'prop-types';
import React from 'react';
import { Item, Photo } from './ImageGalleryItem.styled';

export function ImageGalleryItem({
  smallImg,
  largeImg,
  tags,
  toggleModal,
  getLargeImgForModal,
}) {
  const handleClick = () => {
    toggleModal();
    getLargeImgForModal(largeImg);
  };

  return (
    <Item className="gallery-item" onClick={handleClick}>
      <Photo src={smallImg} alt={tags} />
    </Item>
  );
}

// ImageGalleryItem.propTypes = {
//   largeImg: PropTypes.string.isRequired,
//   smallImg: PropTypes.string.isRequired,
//   tags: PropTypes.string.isRequired,
//   // toggleModal: PropTypes.func.isRequired,
//   getLargeImgForModal: PropTypes.func.isRequired,
// };
