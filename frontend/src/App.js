import React, { Component } from 'react';
import './css/App.css';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './util/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import store from './store';


//---------------don--------------------------------
import Addmenu from './component/addmenu'
import Addsnack from './component/addsnack';
import Snack from './component/snack/snack.js'
import UnderConstruct from './component/underconstruct/'
//---------------name-------------------------------
import Navbar from "./component/navbar/navbar";
import Carousel from "./component/carousel/carousel";
import Choice from "./component/choice/choice";
import Recommend from "./component/recommend/recommend";
//---------------boo---------------------------------
import Menu from './component/menu/menu.js'
//---------------been-----------------------------------
import Register from './component/register/register.js'
import Footer from './component/footer/footer.js'
//---------------pat------------------------------------
import Login from './component/login/mainlogin/login'
import Package from './component/packagemanage/packagemanage'
import Pack from './component/packmenubox/packmenu'

const Home = () => {
  return [ <Carousel />, <Recommend />, <Choice />];
};

//Check for token
if(localStorage.jwtToken) {
  //Set auth token header  auth
  setAuthToken(localStorage.jwtToken);
  const decode = jwt_decode(localStorage.jwtToken);
  // set user and isAuth
  store.dispatch(setCurrentUser(decode));

  //check for expired token
  const currentTime = Date.now() /1000;
  if(decode.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());
    //TODO: Clear current profile
    // Clear current profile

    //redirect
    window.location.href = '/login';
  }
}


{/*-------------Add path of page---------------*/}
class App extends Component {
 
  render() {
    return (
      <Provider store={ store }> 
        <Router>
          <div className="App">
            <Navbar />
              <Switch>
                <Route exact path="/" component={Home} />
                {/* <Route path="/demomenu" component={DemoMenu} /> */}
                <Route path="/add/menu" component={Addmenu} />
                <Route path="/add/snack" component={Addsnack} />
                <Route path="/show/menu" component={Menu} />
                <Route path="/show/snack" component={Snack} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/packagemanage" component={Package} />
                <Route path="/package" component={Pack} />
                <Route path="*" component={UnderConstruct}/>> 
              </Switch>
            {/* <Footer /> */}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
