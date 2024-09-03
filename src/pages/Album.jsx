import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Navigation from '../components/Navigation';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import SearchForm from '../components/SearchForm';
import styles from '../css modules/Album.module.css';

class Album extends Component {
  state = {
    clickedAlbum: undefined,
    tracks: undefined,
    loading: true,
    itemSearch: '',
    isButtonDisabled: true,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const tracks = await getMusics(id);
    this.setState({
      clickedAlbum: tracks[0],
      tracks: tracks.slice(1, tracks.length),
      loading: false,
    });
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.updateButtonState);
  };

  updateButtonState = () => {
    const { itemSearch } = this.state;
    const isButtonDisabled = itemSearch.length < 2;
    this.setState({ isButtonDisabled });
  };

  render() {
    const { clickedAlbum, tracks, loading, itemSearch, isButtonDisabled } = this.state;

    if (loading) {
      return (
        <div data-testid="page-album">
          <Loading />
        </div>
      );
    }

    return (
      <div data-testid="page-album" className={ styles.albumPage }>
        <div className={ styles.gradientContainer }>
          <SearchForm
            itemSearch={ itemSearch }
            isButtonDisabled={ isButtonDisabled }
            onInputChange={ this.handleInputChange }
            onSearch={ this.handleClick }
          />
        </div>
        <div className={ styles.contentContainer }>
          <nav className={ styles.navigationContainer }>
            <Navigation />
          </nav>
          <div className={ styles.tracksContainer }>
            <p data-testid="artist-name">
              {clickedAlbum ? `Artista: ${clickedAlbum.artistName}` : 'VAZIO'}
            </p>
            <p data-testid="album-name">
              {clickedAlbum ? `Álbum: ${clickedAlbum.collectionName}` : 'VAZIO'}
            </p>
            <div className={ styles.musicList }>
              {tracks && tracks.length > 0 ? (
                tracks.map((track) => (
                  <MusicCard key={ track.trackId } track={ track } />
                ))
              ) : (
                <p>Nenhuma música encontrada.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
