export function ImageGalleryItem({ smallImg, lardeImg, tags }) {
  return (
    <li className="gallery-item">
      <img src={smallImg} alt={tags} />
    </li>
  );
}
