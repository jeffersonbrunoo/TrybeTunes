import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loading from './Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    loading: false,
    isFavorite: false,
  };

  async componentDidMount() {
    const isFavorite = await this.isFavoriteSong();
    this.setState({ isFavorite });
  }

  handleCheckboxChange = async ({ target: { checked } }) => {
    const { track } = this.props;
    this.setState({
      loading: true,
    });

    if (checked) {
      await addSong(track);
    } else {
      await removeSong(track);
    }
    this.setState({
      loading: false,
      isFavorite: checked,
    });
  };

  isFavoriteSong = async () => { // Função para verificar se o trackId da musica marcada é igual ao trackid da musica salva no array
    const { track: { trackId } } = this.props;
    const favoriteSongs = await getFavoriteSongs();
    return favoriteSongs.some((song) => song.trackId === trackId);
  };

  render() {
    const { track: { trackId, trackName, previewUrl }, removeCard } = this.props;
    const { loading, isFavorite } = this.state;

    return (
      <div className="musicPlayer">
        <p>{trackName}</p>
        <audio src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ `favoriteSong-${trackId}` }>
          Favorita
          <input
            type="checkbox"
            name="favoriteSong"
            id={ `favoriteSong-${trackId}` }
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ removeCard || this.handleCheckboxChange }
            checked={ isFavorite }
          />
        </label>
        {
          loading && <Loading />
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  track: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
  removeCard: PropTypes.func.isRequired,
};

export default MusicCard;
