import React, { Component } from "react";
import "./editprofile.css";
import propTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import axios from "axios";
import classnames from "classnames";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      phonenumber: "",
      profilepic: null,
      imagePreviewUrl: null,
      checkimg: null,
      errors: {},
      lat: [],
      lng: [],
      dest: [],
      dist: [],
      isLoaded: false,
      currentUser: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleChangeImage(e) {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState(
        {
          profilepic: file,
          imagePreviewUrl: reader.result
        },
        () => {
          console.log("pic", this.state.profilepic);
        }
      );
    };
    reader.readAsDataURL(file);
  }

  renderRedirect() {
    return (window.location.href = "profile");
  }

  handleSubmit(e) {
    const formData = new FormData();
    if (this.state.imagePreviewUrl != this.state.checkimg) {
      formData.append("img", this.state.profilepic, this.state.profilepic.name);
    } else {
      formData.append("img_url", this.state.imagePreviewUrl);
    }
    formData.append("first_name", this.state.first_name);
    formData.append("last_name", this.state.last_name);
    formData.append("email", this.state.email);
    formData.append("phonenumber", this.state.phonenumber);
    console.log(formData)
    axios.put("api/users/edit/profile", formData)
    .then(response => {
      console.log("res", response);
    })
    .then(() => {
      console.log("redirect");
      this.renderRedirect();
    });
    e.preventDefault();
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      return this.props.history.push("/");
    }
    axios
      .get("/api/users/profile")
      .then(res => {
        this.setState(
          {
            currentUser: res.data
          },
          () => {
            console.log("curUser ", this.state.currentUser);
          }
        );
      })
      .then(() =>
        this.setState({
          first_name: this.state.currentUser.first_name,
          last_name: this.state.currentUser.last_name,
          email: this.state.currentUser.email,
          phonenumber: this.state.currentUser.phonenumber,
          imagePreviewUrl: this.state.currentUser.img_url,
          checkimg: this.state.currentUser.img_url,
          isLoaded: true
        })
      );
  }

  render() {
    if (!!!this.state.isLoaded) {
      return <div className="loader" />;
    }
    {
      console.log("....", this.state.currentUser);
    }
    const { errors } = this.state;
    const { currentUser } = this.state;
    return (
      <div className="set-screen">
        {" "}
        {/*bg*/}
        <div className="editprofile-box">
          <form noValidate onSubmit={this.handleSubmit}>
            <h2> PROFILE </h2>
            <div className="profilepic-edit center">
              <img className="userpic" src={this.state.imagePreviewUrl} />
              <input
                // className="form-control-file"
                type="file"
                name="img"
                accept="image/jpg"
                onChange={this.handleChangeImage}
                required
              />
            </div>
            <br />
            <div className=" addmargin row">
              <div className="col-sm-6">
                <label
                  className="control-label text-form-left"
                  htmlFor="Firstname"
                >
                  Firstname:
                </label>
              </div>
              <div className="col-sm">
                <input
                  className={classnames("form-control", {
                    "is-invalid": errors.first_name
                  })}
                  name="first_name"
                  type="text"
                  id="Firstname"
                  placeholder="Firstname"
                  onChange={this.handleChange}
                  value={this.state.first_name}
                />
                {errors.first_name && (
                  <div className="invalid-feedback">{errors.first_name}</div>
                )}
              </div>
            </div>
            <div className=" addmargin row">
              <div className="col-sm-6">
                <label
                  className="control-label text-form-left"
                  htmlFor="Lastname"
                >
                  Lastname:
                </label>
              </div>
              <div className="col-sm">
                <input
                  className={classnames("form-control", {
                    "is-invalid": errors.last_name
                  })}
                  type="text"
                  name="last_name"
                  id="Lastname"
                  placeholder="Lastname"
                  onChange={this.handleChange}
                  value={this.state.last_name}
                />
                {errors.last_name && (
                  <div className="invalid-feedback">{errors.last_name}</div>
                )}
              </div>
            </div>
            <div className=" addmargin row">
              <div className="col-sm-6">
                <label
                  className="control-label text-form-left"
                  htmlFor="Username"
                >
                  Username:
                </label>
              </div>
              <div className="col-sm">{currentUser.user_name}</div>
            </div>
            <div className=" addmargin row">
              <div className="col-sm-6">
                <label className="control-label text-form-left" htmlFor="Email">
                  E-mail:
                </label>
              </div>
              <div className="col">
                <input
                  type="email"
                  className={classnames("form-control", {
                    "is-invalid": errors.email
                  })}
                  name="email"
                  id="Email"
                  placeholder="Email"
                  onChange={this.handleChange}
                  value={this.state.email}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
            </div>
            <div className=" addmargin row">
              <div className="col-sm-6">
                <label
                  className="control-label text-form-left"
                  htmlFor="PhoneNumber"
                >
                  Phone Number: &nbsp;&nbsp;
                </label>
              </div>
              <div className="col">
                <input
                  type="text"
                  className={classnames("form-control", {
                    "is-invalid": errors.phonenumber
                  })}
                  name="phonenumber"
                  id="PhoneNumber"
                  placeholder="Phone number"
                  onChange={this.handleChange}
                  value={this.state.phonenumber}
                />
                {errors.phonenumber && (
                  <div className="invalid-feedback">{errors.phone}</div>
                )}
              </div>
            </div>
            <div className=" row">
              <div className="col-sm-6">
                <label
                  className="control-label text-form-left"
                  htmlFor="PhoneNumber"
                >
                  Address: &nbsp;&nbsp;
                </label>
              </div>
              <div className="col">
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle addr-dropdown"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Address
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a class="dropdown-item" href="#">
                      {currentUser.address[0].address}
                    </a>
                    <a class="dropdown-item" href="#">
                      Address 2
                    </a>
                    <a class="dropdown-item" href="#">
                      Add Address
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <button width="auto" type="submit" className="btn button-confirm">
              {" "}
              Submit{" "}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  registerUser: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(EditProfile));