import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import styles from '../css modules/Header.module.css';

class Header extends Component {
  state = {
    user: null,
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user });
  }

  renderHeaderContent = () => {
    const { user } = this.state;

    return (
      <>
        <p className={ styles.link }>{user.name}</p>
        <Link to="/" className={ styles.link }>Sair</Link>
      </>
    );
  };

  render() {
    const { user } = this.state;

    // Enquanto `user` for null, não renderizamos nada (ou podemos renderizar algo específico)
    if (!user) return null;

    return (
      <header className={ styles.header }>
        <div className={ styles.headerName }>
          {this.renderHeaderContent()}
        </div>
      </header>
    );
  }
}

export default Header;
