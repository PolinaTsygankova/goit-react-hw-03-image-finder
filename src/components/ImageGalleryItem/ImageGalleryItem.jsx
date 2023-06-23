export function ImageGalleryItem({ smallImg, largeImg, tags }) {
  return (
    <li className="gallery-item">
      <img src={smallImg} alt={tags} />
    </li>
  );
}
