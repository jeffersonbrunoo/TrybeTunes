import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

class ProfileEdit extends Component {
  state = {
    isButtonDisabled: true,
    userName: '',
    userEmail: '',
    userDescription: '',
    userImage: '',
    loading: false,
  };

  async componentDidMount() {
    const userInfo = await getUser();
    const { name, email, description, image } = userInfo;
    this.setState({
      userName: name,
      userEmail: email,
      userDescription: description,
      userImage: image,
    });
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value }, this.verifyUserInfos);
  };

  handleClick = async () => {
    const { history } = this.props;
    this.setState({ loading: true });

    const { userName, userEmail, userDescription, userImage } = this.state;
    await updateUser({
      name: userName,
      email: userEmail,
      image: userImage,
      description: userDescription,
    });

    this.setState({ loading: false }, () => {
      history.push('/profile');
    });
  };

  verifyUserInfos = () => {
    const { userName, userEmail, userDescription, userImage } = this.state;
    const isButtonDisabled = !(userName && userEmail && userDescription && userImage);
    this.setState({ isButtonDisabled });
  };

  render() {
    const { isButtonDisabled,
      userName,
      userEmail,
      userDescription,
      userImage,
      loading } = this.state;

    return (
      <>
        <div data-testid="page-profile-edit">
          <Header />
        </div>
        {loading && <Loading />}
        <section>
          <div>
            <img src={ userImage } alt={ userName } data-testid="profile-image" />
            <input
              data-testid="edit-input-image"
              name="userImage"
              id="userImage"
              value={ userImage }
              type="text"
              placeholder="URL da imagem"
              onChange={ this.handleChange }
            />
          </div>
          <form>
            <input
              type="text"
              name="userName"
              id="userName"
              value={ userName }
              data-testid="edit-input-name"
              placeholder="Nome"
              onChange={ this.handleChange }
            />
            <input
              type="email"
              name="userEmail"
              id="userEmail"
              value={ userEmail }
              data-testid="edit-input-email"
              placeholder="nome@test.com"
              onChange={ this.handleChange }
            />
            <textarea
              name="userDescription"
              id="userDescription"
              value={ userDescription }
              data-testid="edit-input-description"
              placeholder="Descrição"
              cols="30"
              rows="10"
              onChange={ this.handleChange }
            />
          </form>
          <button
            type="button"
            data-testid="edit-button-save"
            disabled={ isButtonDisabled }
            onClick={ this.handleClick }
          >
            Editar perfil
          </button>
        </section>
      </>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
