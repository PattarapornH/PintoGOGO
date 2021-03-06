import React, { Component } from "react";
import "./profile.css";
import propTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getProfile } from "../api/api";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      currentUser: null
    };

    this.dropdownDOM = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      return this.props.history.push("/");
    }
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      return this.props.history.push("/");
    }

    const get_user = getProfile.bind(this, "currentUser", "isLoaded");
    get_user();
  }

  render() {
    if (!!!this.state.isLoaded) {
      return <div className="loader" />;
    }
    const { currentUser } = this.state;

    return (
      <div className="set-screen">
        {" "}
        <div className="profile-box">
          <h2> PROFILE </h2>
          <img
            className="userpic"
            src={currentUser.img_url}
            alt="user profile"
          />
          <div className=" addmargin row">
            <div className="col-sm-6">
              <label htmlFor="Firstname">Firstname:</label>
            </div>
            <div className="col-sm">{currentUser.first_name}</div>
          </div>
          <div className=" addmargin row">
            <div className="col-sm-6">
              <label htmlFor="Lastname">Lastname:</label>
            </div>
            <div className="col-sm">{currentUser.last_name}</div>
          </div>
          <div className=" addmargin row">
            <div className="col-sm-6">
              <label htmlFor="Username">Username:</label>
            </div>
            <div className="col-sm">{currentUser.user_name}</div>
          </div>
          <div className="addmargin row">
            <div className="col-sm-6">
              <label htmlFor="Email">E-mail:</label>
            </div>
            <div className="col">{currentUser.email}</div>
          </div>
          <div className=" addmargin row">
            <div className="col-sm-6">
              <label htmlFor="PhoneNumber">Phone Number: </label>
            </div>
            <div className="col">{currentUser.phonenumber}</div>
          </div>
          <div className="addr-area col">
            <label htmlFor="PhoneNumber">Address</label>

            {currentUser.address.map((item, index) => (
              <div className=" edit-list__addr addr-list">
                <li>{item.address}</li>
              </div>
            ))}
          </div>

          <br />
          <a href="/edit/profile">
            <button width="auto" type="submit" className="btn button-confirm">
              {" "}
              EDIT PROFILE{" "}
            </button>
          </a>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  registerUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(withRouter(Profile));
