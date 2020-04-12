import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment'

export default class EditBook extends Component {
  constructor(props) {
    super(props);

    this.onChangebook = this.onChangebook.bind(this);
    this.onChangetitle = this.onChangetitle.bind(this);
    this.onChangenumber = this.onChangenumber.bind(this);
    this.onChangeupdated = this.onChangeupdated.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      book: '',
      title: '',
      number: 0,
      upupdatedd: new Date(),
      users: []
    }
  }

  componentDidMount() {
    const exist = localStorage.getItem('myData')
    axios.get('http://localhost:5000/api/v3/transactions/'+this.props.match.params.id,
    {
      headers: {
        'Authorization': `Bearer ${exist}`
      }
    }
    )
      .then(response => {
        this.setState({
          book: response.data.book,
          title: response.data.title,
          number: response.data.number,
          updated: new Date(response.data.updated)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
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

  onChangebook(e) {
    this.setState({
      book: e.target.value
    })
  }

  onChangetitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  onChangenumber(e) {
    this.setState({
      number: e.target.value
    })
  }

  onChangeupdated(updated) {
    this.setState({
      updated: updated
    })
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.validateForm(this.state.number,this.state.title,this.state.book,this.state.updated)) {
    const transaction = {
      book: this.state.book,
      title: this.state.title,
      number: this.state.number,
      updated: this.state.updated
    }
    const exist = localStorage.getItem('myData')
    axios.put('http://localhost:5000/api/v3/transactions/' + this.props.match.params.id, transaction,
    {
      headers: {
        'Authorization': `Bearer ${exist}`
      }
    }
    )
      .then(res => {
        console.log(res)
        console.log(res.data)
      })
    window.location = '/';
    }
  }

  render() {
    return (
        <div className="container mt-4 mb-5">
        <label className="label">Edit Loan Book</label>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
        <label className="label">Book: </label>
          <input type="text"
              required
              className="form-control"
              value={this.state.book}
              onChange={this.onChangebook}>
          </input>
        </div>
        <div className="form-group"> 
        <label className="label">Title: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangetitle}
              />
        </div>
        <div className="form-group">
        <label className="label">Number: </label>
          <input 
              type="number" 
              className="form-control"
              value={this.state.number}
              onChange={this.onChangenumber}
              />
        </div>
        <div className="form-group">
        <label  className="label" for="date">Due Date:</label>
          <div>
            <input 
              type="date" 
              name="bday" 
              required pattern="\d{4}-\d{2}-\d{2}"
              onChange ={this.onChange}
              className="form-control" 
              value={this.state.bday}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Loan Book" className="button is-info is-focused" />
        </div>
      </form>
    </div>
    )
  }
}