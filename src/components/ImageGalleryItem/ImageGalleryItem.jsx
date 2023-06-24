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
