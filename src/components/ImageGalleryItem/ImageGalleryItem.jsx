import PropTypes from 'prop-types';

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

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  openModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
