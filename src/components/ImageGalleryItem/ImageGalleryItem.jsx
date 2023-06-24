import { Item, Photo } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ smallImg, largeImg, tags, toggleModal }) {
  const handleClick = () => {
    toggleModal();
  };

  return (
    <>
      <Item className="gallery-item" onClick={handleClick}>
        <Photo src={smallImg} alt={tags} />
      </Item>
    </>
  );
}
