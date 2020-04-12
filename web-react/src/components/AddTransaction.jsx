import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'

export default class AddTransaction extends Component {
  
  state = {
    Number:0,
    title:'',
    bname:'',
    bday:''
  }


  validateForm = (number,title,name,bday) => {
    if (!number||!title||!name||!bday) {
      window.alert('Please fill in ALL data fields.');
      return false;
    } else if ( !isNaN(title) ||!isNaN(name)) {
      window.alert('Please fill only TEXT detail in transaction name.');
      return false;
    } else if(number<0){
      window.alert('No Book Number');
      return false;
    }else if(moment().isAfter(bday)){
      window.alert('Please check your returned date!!!');
      return false;
    }
    return true;
  }

  onChange = (e) => {
    this.setState( { [e.target.name]: e.target.value } );
  }

  onSubmit = (e) => {
    e.preventDefault();
    if(this.validateForm(this.state.Number,this.state.title,this.state.bname,this.state.bday)) {
    const exist = localStorage.getItem('myData')
    const url="http://localhost:5000/api/v3/transactions";
    axios.post(url,
      {
        "book":this.state.bname,
        "title":this.state.title,
        "number":this.state.Number,
        "updated":this.state.bday
      },
        {headers: {
            'Authorization': `Bearer ${exist}`
          }
        }).then(res=>{
          alert("Add Success!!!");
          window.location.reload(false) 
        })
     }
  }
  
  render() {
    return (
      <div className="container mt-4 mb-5">
        <label className="label">Loan Book</label>
      <div className="columns is-centered">
      <div className="column is-half">
        <form id="add-transaction_form" onSubmit={this.onSubmit}>

          <div className="form-group">
            <label  className="label" htmlFor="bname">Book Name</label>
            <input 
              type="text" 
              name="bname" 
              className="form-control" 
              onChange ={this.onChange}
              value={this.state.name}
            />
          </div>
          <div className="form-group">
            <label  className="label" htmlFor="title">Book Title</label>
            <input 
              type="text" 
              name="title" 
              className="form-control" 
              onChange ={this.onChange}
              value={this.state.title}
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="Number">Book Number</label>
            <input 
              type="number" 
              name="Number" 
              className="form-control" 
              onChange ={this.onChange}
              value={this.state.Number}
            />
          </div>
          <div className="form-group">
            <label  className="label" for="date">Due Date</label>
            <input 
              type="date" 
              name="bday" 
              required pattern="\d{4}-\d{2}-\d{2}"
              onChange ={this.onChange}
              className="form-control" 
              value={this.state.bday}
            />
          </div>

          <input type="submit" value="Add Book" className="button is-info is-focused"/>
        </form>
      </div>
      </div>
      </div>
    )
  }
}
