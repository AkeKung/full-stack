import React, { Component,useHistory } from 'react'
import 'bulma/css/bulma.css' 
import axios from 'axios'
import Login from './Login';

export default class Register extends Component {
  
  state = {
    fname:'',
    lname:'',
    name:'',
    email:'',
    password:'',
    comfirmpassword:'',
    success:false
  }

  onChange = (e) => {
    this.setState( { [e.target.name]: e.target.value } );
  }

  validateForm = (fname,lname,name,email,password,comfirmpassword) => {
    if (!fname||!lname||!name||!email||!password||!comfirmpassword) {
      window.alert('Please fill in ALL data fields.');
      return false;
    } else if ( !isNaN(fname) ||!isNaN(lname)||!isNaN(name)) {
      window.alert('Please fill only TEXT detail in transaction name.');
      return false;
    } else if(password!==comfirmpassword){
      window.alert('Password Not Same!!!');
      return false;
    }
    return true;
  }

  onSubmit = (e) => {
    e.preventDefault();
    if(this.validateForm (this.state.fname,this.state.lname,this.state.name,this.state.email,this.state.password,this.state.comfirmpassword)){
    axios.post(
        'http://localhost:5000/api/v3/users',
        {
            "fname":this.state.fname,
            "lname":this.state.lname,
            "name":this.state.name,
	        "email":this.state.email,
            "password":this.state.password,
        }
        ).then(res=>{
            console.log(res);
            console.log(res.data);
            this.setState({success:true}) 
        }).catch (error=> {
            window.alert('Register failed, please check your email and password')
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error);
        })
    }
  }

  render() {
    if(this.state.success){
        return (
          <Login/>
      ) 
    }

    return (
        <section className="section container" >
        <div className="columns is-centered">
            <div className="column is-half">
                <form onSubmit={this.onSubmit}>
                    <div className="field">
                        <label className="label">First Name</label>
                        <div className="control">
                            <input className="input" type="name" name="fname" onChange ={this.onChange}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Last Name</label>
                        <div className="control">
                            <input className="input" type="name" name="lname" onChange ={this.onChange}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">User Name</label>
                        <div className="control">
                            <input className="input" type="name" name="name" onChange ={this.onChange}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input className="input" type="email" name="email" onChange ={this.onChange}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">
                            Password
                        </label>
                        <div className="control">
                            <input className="input" type="password" name="password" onChange ={this.onChange}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">
                            Comfirm Password
                        </label>
                        <div className="control">
                            <input className="input" type="password" name="comfirmpassword" onChange ={this.onChange}/>
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                        <input type="submit" defaultValue="LogIn" className="button is-link"/>
                        </div>
                        <a href="/" className="button is-link">Home</a>
                    </div>
                </form>
            </div>
        </div>
    </section>
    )
  }
}
