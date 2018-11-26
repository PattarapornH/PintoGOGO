import React, { Component } from "react";
import CardMenu from "../cardmenu/cardmenu";
import "./menuandsnack.css";
import { getFoodOrSnack } from '../api/api';

class MenuAndSnack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menus: {},
      isLoaded: false,
      firstImg: 0,
      secondImg: 1,
      thirdImg: 2,
      forthImg: 3,
      fifthImg: 4,
      sixthImg: 5,
    };
    console.log("props",this.props.path)
    this.checkFirstMenuSet = this.checkFirstMenuSet.bind(this);
    this.checkLastMenuSet = this.checkLastMenuSet.bind(this);
    this.leftClick = this.leftClick.bind(this);
  }

  componentDidMount() {
    const GetFood = getFoodOrSnack.bind(this, "menus", "isLoaded", this.props.path);
    GetFood();
  }

  rightClick(e) {
    console.log("Click!!!!");
    this.setState({
      firstImg: this.state.firstImg + 6,
      secondImg: this.state.secondImg + 6,
      thirdImg: this.state.thirdImg + 6,
      forthImg: this.state.forthImg + 6,
      fifthImg: this.state.fifthImg + 6,
      sixthImg: this.state.sixthImg + 6
    });
    e.preventDefault();
  }

  leftClick(e) {
    console.log("Click!!!!");
    this.setState({
      firstImg: this.state.firstImg - 6,
      secondImg: this.state.secondImg - 6,
      thirdImg: this.state.thirdImg - 6,
      forthImg: this.state.forthImg - 6,
      fifthImg: this.state.fifthImg - 6,
      sixthImg: this.state.sixthImg - 6
    });
    e.preventDefault();
  }

  checkFirstMenuSet() {
    let img = ""
    if (this.state.firstImg - 6 >= 0) {
      img = <img src="/img/other/left-arrow.png" alt="left arrow icon" height="20" />;
    }
    console.log("left ", img)
    return img;
  }

  checkLastMenuSet() {
    let img = "";
    if(this.state.firstImg + 5 <= this.state.menus.length && this.sixthImg + 1 != this.state.menus.length){
      img = <img className="imgbutton" src="/img/other/right-arrow.png" alt="right arrow icon" height="20" />
    }
    // if (this.state.firstImg < this.state.menus.length &&
    //   this.state.secondImg < this.state.menus.length &&
    //   this.state.thirdImg < this.state.menus.length &&
    //   this.state.forthImg < this.state.menus.length &&
    //   this.state.fifthImg < this.state.menus.length &&
    //   this.state.sixthImg < this.state.menus.length && this.state.menus.length != 0) {
    //     img = <img className="imgbutton" src="/img/other/right-arrow.png" alt="right arrow icon" height="20" />
    // }
    console.log("right ", img)
    return img;
  }

  onMenuCardDeleted(index) {
    const newMenus = this.state.menus.slice();
    newMenus.splice(index, 1);
    this.setState({
      menus: newMenus
    });
  }

  render() {
    const {
      isLoaded,
      menus,
      firstImg,
      secondImg,
      thirdImg,
      forthImg,
      fifthImg,
      sixthImg
    } = this.state;
    if (!isLoaded) {
      return <div className="loader" />;
    }
    return (
      <div className="menuzone">

        <div className="mergerow--left">
          <div onClick={this.leftClick.bind(this)}>
            {this.checkFirstMenuSet()}</div>
        </div>

        <div className="row">
          <div className="row">
            <div className="col-md-4 menuzone__image--fix">
              {menus[firstImg] && (
                <CardMenu
                  name={menus[firstImg][this.props.name]}
                  picture={menus[firstImg].img_url}
                  calories={menus[firstImg].calories}
                  id={menus[firstImg]._id}
                  price={menus[firstImg].price}
                  onMenuCardDeleted={this.onMenuCardDeleted.bind(this, firstImg)}
                />
              )}
            </div>

            <div className="col-md-4 menuzone__image--fix">
              {menus[secondImg] && (
                <CardMenu
                  name={menus[secondImg][this.props.name]}
                  picture={menus[secondImg].img_url}
                  calories={menus[secondImg].calories}
                  id={menus[secondImg]._id}
                  price={menus[secondImg].price}
                  onMenuCardDeleted={this.onMenuCardDeleted.bind(this, secondImg)}
                />
              )}
            </div>

            <div className="col-md-4 menuzone__image--fix">
              {menus[thirdImg] && (
                <CardMenu
                  name={menus[thirdImg][this.props.name]}
                  picture={menus[thirdImg].img_url}
                  calories={menus[thirdImg].calories}
                  id={menus[thirdImg]._id}
                  price={menus[thirdImg].price}
                  onMenuCardDeleted={this.onMenuCardDeleted.bind(this, thirdImg)}
                />
              )}
            </div>
          </div>
          <div className="row">

            <div className="col-md-4 menuzone__image--fix">
              {menus[forthImg] && (
                <CardMenu
                  name={menus[forthImg][this.props.name]}
                  picture={menus[forthImg].img_url}
                  calories={menus[forthImg].calories}
                  id={menus[forthImg]._id}
                  price={menus[forthImg].price}
                  onMenuCardDeleted={this.onMenuCardDeleted.bind(this, forthImg)}
                />
              )}
            </div>
            <div className="col-md-4 menuzone__image--fix">
              {menus[fifthImg] && (
                <CardMenu
                  name={menus[fifthImg][this.props.name]}
                  picture={menus[fifthImg].img_url}
                  calories={menus[fifthImg].calories}
                  id={menus[fifthImg]._id}
                  price={menus[fifthImg].price}
                  onMenuCardDeleted={this.onMenuCardDeleted.bind(this, fifthImg)}
                />
              )}
            </div>

            <div className="col-md-4 menuzone__image--fix">
              {menus[sixthImg] && (
                <CardMenu
                  name={menus[sixthImg][this.props.name]}
                  picture={menus[sixthImg].img_url}
                  calories={menus[sixthImg].calories}
                  id={menus[sixthImg]._id}
                  price={menus[sixthImg].price}
                  onMenuCardDeleted={this.onMenuCardDeleted.bind(this, sixthImg)}
                />
              )}
            </div>


          </div>
        </div>


        <div className="mergerow--right">
          <div onClick={this.rightClick.bind(this)}>
            {this.checkLastMenuSet()}
          </div>
        </div>
        {/* <div /> */}




        <div />
      </div>
    );
  }
}

export default MenuAndSnack;
