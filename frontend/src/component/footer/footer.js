import React, { Component } from "react";
import "./footer.css";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="text-left">
          <p className="p1">PintoGoGo</p>
          <p className="p2">
            Welcome to PintoGoGo. Here you can find a lot of quality foods. Have
            a good meal.
          </p>
        </div>
        <div className="topright">
          <a className="link" href="/show/menu">
            MENU
          </a>{" "}
          <a className="link" href="/package">
            PACKAGE
          </a>{" "}
          <a className="link" href="/show/snack">
            SNACK
          </a>
        </div>
        <hr />
        <div className="bottomright">
          <p> Copyright 2018&copy; PintoGoGo Created by Pinto Team</p>
        </div>
      </div>
    );
  }
}

export default Footer;
