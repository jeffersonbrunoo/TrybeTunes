import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import styles from '../css modules/Header.module.css';

class Header extends Component {
  state = {
    loading: true,
    user: null,
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({ loading: false, user });
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
    const { loading } = this.state;
    if (loading) return <Loading />;
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
