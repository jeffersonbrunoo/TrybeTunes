import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../css modules/Search.module.css';

class SearchForm extends Component {
  render() {
    const { itemSearch, isButtonDisabled, onInputChange, onSearch } = this.props;

    return (
      <form className={ styles.inputButtonContainer }>
        <label htmlFor="itemSearch">
          <input
            type="text"
            name="itemSearch"
            id="itemSearch"
            value={ itemSearch }
            onChange={ onInputChange }
            className={ styles.input }
          />
        </label>
        <button
          type="button"
          disabled={ isButtonDisabled }
          onClick={ onSearch }
          className={ styles.button }
        >
          Pesquisar
        </button>
      </form>
    );
  }
}

SearchForm.propTypes = {
  itemSearch: PropTypes.string.isRequired,
  isButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SearchForm;
