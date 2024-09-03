import React, { Component } from 'react';
import styles from '../css modules/Loading.module.css';

class Loading extends Component {
  render() {
    return (
      <p className={ styles.loading }>Carregando...</p>
    );
  }
}

export default Loading;
