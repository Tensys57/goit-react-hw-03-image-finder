import { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { getPhotos } from '../Service/PhotoService';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import css from '../components/App.module.css';

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
    if (this.state.query === query) {
      return alert('Already shown');
    }
    this.setState({
      query,
      page: 1,
      hits: [],
      showBtn: false,
      isEmpty: false,
      error: '',
    });
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
    const { hits, isLoading, isEmpty, showBtn, largeImageURL, error } =
      this.state;
    return (
      <div className={css.container}>
        <Searchbar onSubmit={this.onSubmit} />
        {hits.length > 0 && (
          <ImageGallery photos={hits} openModal={this.showModal} />
        )}
        {showBtn && <Button handleClick={this.handleClick} />}
        {isLoading && <Loader />}
        {largeImageURL && (
          <Modal
            largeImageURL={largeImageURL}
            tags={hits.tags}
            closeModal={this.showModal}
          />
        )}
        {isEmpty && (
          <p className={css.warning}>Sorry. There are no images ... 😭</p>
        )}
        {error && <p className={css.warning}>Sorry. {error} ... 😭</p>}
      </div>
    );
  }
}
