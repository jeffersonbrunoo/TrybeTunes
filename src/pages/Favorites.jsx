import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  state = {
    loading: false,
    favoriteSongs: [],
  };

  async componentDidMount() {
    await this.fetchFavoriteSongs();
  }

  fetchFavoriteSongs = async () => {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs, loading: false });
  };

  handleRemoveFavorite = async (track) => {
    this.setState({ loading: true });
    await removeSong(track);
    await this.fetchFavoriteSongs();
  };

  renderFavoriteSongs = () => {
    const { favoriteSongs } = this.state;
    return favoriteSongs.map((track) => (
      <MusicCard
        key={ track.trackId }
        track={ track }
        removeCard={ () => this.handleRemoveFavorite(track) }
      />
    ));
  };

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading ? <Loading /> : <div>{this.renderFavoriteSongs()}</div>}
      </div>
    );
  }
}

Favorites.propTypes = {
  track: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default Favorites;
