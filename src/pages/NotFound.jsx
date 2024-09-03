import React from 'react';
import styles from '../css modules/Notfound.module.css';

class NotFound extends React.Component {
  render() {
    return (
      <div className={ styles.container }>

        <p className={ styles.title }>Ops!</p>
        <p className={ styles.subtitle }>A página que você está procurando não foi encontrada.</p>

      </div>
    );
  }
}

export default NotFound;
