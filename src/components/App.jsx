import { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { getPhotos } from '../Service/PhotoService';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

import css from './App.module.css';

export class App extends Component {
  state = {
    hits: [],
    query: '',
    isLoading: false,
    isEmpty: false,
    showBtn: false,
    error: '',
    page: 1,
    largeImageURL: '',
  };

  onSubmit = query => {
    this.setState({ query });
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });
      getPhotos(query, page)
        .then(({ hits, totalHits }) => {
          if (!hits.length) {
            this.setState({ isEmpty: true });
            return;
          }
          this.setState(prevState => ({
            hits: [...prevState.hits, ...hits],
            showBtn: page < Math.ceil(totalHits / 12),
          }));
        })
        .catch(error => {
          this.setState({ error: error.message });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  handleClick = () => {
    this.setState(prev => ({
      page: prev.page + 1,
    }));
  };

  showModal = largeImageURL => {
    this.setState({ largeImageURL });
  };

  render() {
    const { hits, isLoading, isEmpty, showBtn, largeImageURL } = this.state;
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Searchbar onSubmit={this.onSubmit} />
        {hits.length > 0 && (
          <ImageGallery photos={hits} openModal={this.showModal} />
        )}
        {showBtn && (
          <button
            type="button"
            className={css.Button}
            onClick={this.handleClick}
          >
            Load more...
          </button>
        )}
        {isLoading && <Loader />}
        {largeImageURL && (
          <Modal
            largeImageURL={largeImageURL}
            tags={hits.tags}
            closeModal={this.showModal}
          />
        )}
      </div>
    );
  }
}
