import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  webformatURL,
  tags,
  largeImageURL,
  openModal,
}) => (
  <li className={css.ImageGalleryItem}>
    <img
      src={webformatURL}
      alt={tags}
      onClick={() => openModal(largeImageURL)}
    />
  </li>
);
