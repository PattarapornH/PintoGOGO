import React, { Component} from 'react';
import { RestClient } from '../api/api'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
class Addmenu extends Component {
    constructor(props){
        super(props);
        this.state = {
            menu_name : "",
            price : "",
            calories : "",
            protein : "",
            carbohydrate : "",
            fat : "",
            img_url : "",
            status: 0
        }
        this.onChangeMenuname = this.onChangeMenuname.bind(this)
        this.onChangePrice = this.onChangePrice.bind(this)
        this.onChangeCalories = this.onChangeCalories.bind(this)
        this.onChangeCarbohydrate = this.onChangeCarbohydrate.bind(this)
        this.onChangeFat = this.onChangeFat.bind(this)
        this.onChangeImgurl = this.onChangeImgurl.bind(this)
        this.onChangeProtien = this.onChangeProtien.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }
    renderRedirect(){
        return <Redirect to='/demoaddmenu' />
    }

    onChangeMenuname(e){
        this.setState({ 
            menu_name : e.target.value
        })
    }

    onChangePrice(e){
        this.setState({
            price : e.target.value
        })
    }
    
    onChangeCalories(e){
        this.setState({
            calories : e.target.value
        })
    }

    onChangeProtien(e){
        this.setState({
            protein : e.target.value
        })
    }

    onChangeCarbohydrate(e){
        this.setState({
            carbohydrate : e.target.value
        })
    }
    onChangeFat(e){
        this.setState({
            fat : e.target.value
        })
    }

    onChangeImgurl(e){
        this.setState({
            img_url : e.target.value
        })
    }

    handleSubmit(e) {
        const menudetail = {
            menu_name : this.state.menu_name,
            price : this.state.price,
            calories : this.state.calories,
            protein : this.state.protein,
            carbohydrate : this.state.carbohydrate,
            fat : this.state.fat,
            img_url : this.state.img_url
        }
        axios.post('http://localhost:4000/menus/food/add', menudetail)
        .then(res => {
            this.setState({status : res.data})
        })
        if(this.state.status == 200){
            this.renderRedirect()
        }
        e.preventDefault()
    }    
    render() {
     const { status } = this.state;
      return (
        <div> 
            <h3>Status : {status}</h3>
            <form onSubmit = {this.handleSubmit.bind(this)}>
                <div>
                    <input type="text" name="menu_name" placeholder="menuname" value={this.state.menu_name} onChange={this.onChangeMenuname} required ></input>
                </div>
                <div>
                    <input type="number" name="price" placeholder="price" value={this.state.price} onChange={this.onChangePrice} required ></input>
                </div>
                <div>
                    <input type="number" name="carlories" placeholder="carlories" value={this.state.calories} onChange={this.onChangeCalories} required ></input>
                </div>
                <div>
                    <input type="number" name="protein" placeholder="protein" value={this.state.protein} onChange={this.onChangeProtien} required ></input>
                </div>
                <div>
                    <input type="number" name="carbohydrate" placeholder="carbohydrate" value={this.state.carbohydrate} onChange={this.onChangeCarbohydrate} required ></input>
                </div>
                <div>
                    <input type="number" name="fat" placeholder="fat" value={this.state.fat} onChange={this.onChangeFat} required ></input>
                </div>
                <div>
                    <input type="text" name="img_url" placeholder="url" value={this.state.img_url} onChange={this.onChangeImgurl} required ></input>
                </div>
                <div>
                    <input type="submit" value="submit"></input>
                </div>
            </form>
        </div>
      );
    }
    
  }

export default Addmenu;