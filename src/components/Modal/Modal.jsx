import { Component } from 'react';
import PropTypes from 'prop-types';

import css from './Modal.module.css';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleOverlayClick = ev => {
    if (ev.target === ev.currentTarget) {
      this.props.closeModal('');
    }
  };

  handleKeyDown = ev => {
    if (ev.key === 'Escape') {
      this.props.closeModal('');
    }
  };

  render() {
    return (
      <div className={css.Overlay} onClick={this.handleOverlayClick}>
        <img
          src={this.props.largeImageURL}
          alt={this.props.tags}
          className={css.Modal}
        />
      </div>
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
};
