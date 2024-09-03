import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import styles from '../css modules/Search.module.css';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import SearchForm from '../components/SearchForm';

class Search extends Component {
  state = {
    itemSearch: '',
    isButtonDisabled: true,
    result: [],
    loading: false,
    search: '',
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, this.updateButtonState);
  };

  updateButtonState = () => {
    const { itemSearch } = this.state;
    const isButtonDisabled = itemSearch.length < 2;
    this.setState({ isButtonDisabled });
  };

  handleClick = async () => {
    this.setState({ loading: true });
    const { itemSearch } = this.state;
    const search = await searchAlbumsAPI(itemSearch);
    this.setState({
      result: search,
      itemSearch: '',
      loading: false,
      search: itemSearch,
    });
  };

  render() {
    const { itemSearch, isButtonDisabled, loading, result, search } = this.state;

    return (
      <div className={ styles.pageContainer }>
        <nav className={ styles.navigationContainer }>
          <Navigation />
        </nav>
        <div className={ styles.contentContainer }>
          <div className={ styles.gradientContainer }>
            <SearchForm
              itemSearch={ itemSearch }
              isButtonDisabled={ isButtonDisabled }
              onInputChange={ this.handleInputChange }
              onSearch={ this.handleClick }
            />
          </div>
          {search && <p>{`Resultado de álbuns de: ${search}`}</p>}
          <section className={ styles.resultContainer }>
            {loading && <Loading />}
            {!loading && result.length > 0 && (
              result.map(({ collectionName, collectionId, artworkUrl100, artistName }) => (
                <div key={ collectionId } className={ styles.albumContainer }>
                  <Link to={ `/album/${collectionId}` } className={ styles.albumLink }>
                    <img
                      src={ artworkUrl100 }
                      alt={ collectionName }
                      className={ styles.albumImage }
                    />
                  </Link>
                  <div className={ styles.albumDescription }>
                    <Link to={ `/album/${collectionId}` } className={ styles.albumLink }>
                      <p>{collectionName}</p>
                    </Link>
                    <p>{artistName}</p>
                  </div>
                </div>
              ))
            )}
            {!loading && result.length === 0 && <p>Nenhum álbum foi encontrado</p>}
          </section>
        </div>
      </div>
    );
  }
}

export default Search;
