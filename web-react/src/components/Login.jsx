import React from 'react'
import 'bulma/css/bulma.css' 
import { BrowserRouter as Router, Route,Redirect} from 'react-router-dom';
import axios from 'axios'

import AddTransaction from './AddTransaction';
import TransactionTable from './TransactionTable';
import About from './About';
import Navbar from './Navbar';
import Settings from './SettingUser';
import EditBook from './EditBook';

export default class Login extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
    email:'',
    password:'',
    check:false,
    logout:false,
    reg:false,
    transactions:[]
  }
  this.logout=this.logout.bind(this)
}

  onChange = e => {
    const { name, value } = e.target
    this.setState({
        [name]: value
    })
}

componentDidMount() {
    if(localStorage.getItem("myData") !== null) {
        this.setState({check:true}) 
        const exist = localStorage.getItem('myData')
    axios.get('http://localhost:5000/api/v3/transactions',{
      headers:{
        'Authorization': `Bearer ${exist}`
      }
    })
      .then(response => {
        this.setState({ transactions: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
    }
}

onSubmit = (e) => {
    e.preventDefault();
    axios.post(
        'http://localhost:5000/api/v3/users/login',
        {
            "email":this.state.email,
            "password":this.state.password
        }
        ).then(
            res=>{
                localStorage.setItem('myData',res.data.token);
                this.setState({check:true})
                this.componentDidMount()
        }).catch((err)=>{
          if(err.response){
            window.alert('Login failed, please check your credentials')
            window.location.reload(false)
          }
        })
  }

  logout(){
    const exist = localStorage.getItem('myData')
    axios.get('http://localhost:5000/api/v3/users/logout',
    {
      headers: {
        'Authorization': `Bearer ${exist}`
      }
    }
    ).then(res => {
        localStorage.clear();
        this.setState({logout:true})
        window.location.reload(false)
    })
}
  
reg=()=>{
  this.setState({reg:true})
}

  render() {
    if(this.state.logout){
      this.setState({logout:false})
      return <Redirect to="/"/>
    }else if(this.state.reg){
      return <Redirect to="/Register" />
    }
      else if(this.state.check === true){
         return(
         <Router>
            < Redirect to='/add'/>
            <div className="container mt-4 mb-5">
              <Navbar logout={this.logout}/>
              <Route path="/add" component={AddTransaction}/>
              <Route path="/history" component={TransactionTable }/>
              <Route path="/edit/:id" component={EditBook} />
              <Route path="/about" component={About} />
              <Route path="/setting" component={Settings} />
            </div> 
            </Router>
         )}
      else{
    return (
        <section className="section container">
        <div className="columns is-centered ">
            <div className="column is-half" >
                <form onSubmit={this.onSubmit}>
                    <div className="field">
                        <label className="label head">Email</label>
                        <div className="control">
                            <input className="input" type="email" name="email" onChange ={this.onChange}/>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label head">
                            Password
                        </label>
                        <div className="control">
                            <input className="input" type="password" name="password" onChange ={this.onChange}/>
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                        <input type="submit" defaultValue="LogIn" className="button is-link"/>
                        </div>
                        <div className="control">
                        <button className="button is-link" onClick={this.reg}>Register</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>

    )
    }  
}
}
