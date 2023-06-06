import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ photos, openModal }) => {
  return (
    <ul className={css.ImageGallery}>
      {photos.map(photo => (
        <ImageGalleryItem
          key={photo.id}
          webformatURL={photo.webformatURL}
          tags={photo.tags}
          openModal={openModal}
          largeImageURL={photo.largeImageURL}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  photos: PropTypes.array.isRequired,
  openModal: PropTypes.func.isRequired,
};
