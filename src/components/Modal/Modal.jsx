import { Backdrop, StyledModal } from './Modal.styled';

export function Modal({ largeImage, toggleModal }) {
  const handleCloseModal = () => {
    toggleModal();
    console.log(largeImage);
  };

  return (
    <Backdrop className="overlay" onClick={handleCloseModal}>
      <StyledModal className="modal">
        <img src={largeImage} alt="" />
      </StyledModal>
    </Backdrop>
  );
}
