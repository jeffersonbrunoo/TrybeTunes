import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    loading: true,
    userInfos: {},
  };

  async componentDidMount() {
    const userInfos = await getUser();
    this.setState({ userInfos, loading: false });
  }

  renderUserInfo = ({ name, description, email, image }) => (
    <>
      <img src={ image } alt="user" data-testid="profile-image" />
      <Link to="/profile/edit">Editar perfil</Link>
      <p>Nome</p>
      <p>{name}</p>
      <p>Email</p>
      <p>{email}</p>
      <p>Descrição</p>
      <p>{description}</p>
    </>
  );

  render() {
    const { loading, userInfos } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <section>
          {loading ? <Loading /> : this.renderUserInfo(userInfos)}
        </section>
      </div>
    );
  }
}

export default Profile;
