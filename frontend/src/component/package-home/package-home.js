import React, { Component } from "react";
import "./style-package-home.css";
class PackageHome extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="row package-home">
          <div className="col-sm">
            <div className="box">
              <img
                src="../img/package/pack.jpg"
                className="package__img__box"
                alt="illustration"
              />

              <div className="desc--text">
                Choose our pre-select 3/5/7 days packages.
              </div>
              <a
                href="/package"
                style={{ color: "black" }}
                className="btn button--pack"
              >
                choose your package
              </a>
            </div>
          </div>

          <div className="col-sm">
            <div className="box">
              <img
                src="../img/package/pack2.png"
                className="package__img__box"
                alt="illustration"
              />
              <div className="desc--text">
                Create your own custom package with your satisfaction.
              </div>
              <a
                href="/package/manage"
                style={{ color: "black" }}
                className="btn button--pack"
              >
                create your own package
              </a>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PackageHome;
