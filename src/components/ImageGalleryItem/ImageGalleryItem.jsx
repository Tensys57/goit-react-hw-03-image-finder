import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  id,
  webformatURL,
  tags,
  largeImageURL,
  openModal,
}) => (
  <li className={css.ImageGalleryItem} key={id}>
    <img
      src={webformatURL}
      alt={tags}
      onClick={() => openModal(largeImageURL)}
    />
  </li>
);
