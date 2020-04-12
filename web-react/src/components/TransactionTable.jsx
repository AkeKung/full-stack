import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function dategenerate(date) {
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun",
                    "Jul","Aug","Sep","Oct","Nov","Dec"];
  const c_date = new Date(date)
  const date_c = c_date.getDate()+' '+monthNames[c_date.getMonth()]+' '+(c_date.getYear()+1900);
  return date_c
}

const Transaction = props => (
  <tr>
    <td>{props.transaction.book}</td>
    <td>{props.transaction.title}</td>
    <td>{props.transaction.number}</td>
    <td>{dategenerate(props.transaction.created)}</td>
    <td>{dategenerate(props.transaction.updated)}</td>
    <td>
      <Link to={"/edit/"+props.transaction._id}>edit</Link> | <a href="#" onClick={() => { props.delectBook(props.transaction._id) }}>delete</a>
    </td>
  </tr>
)

export default class TransactionTable extends Component {
  constructor(props) {
    super(props);

    this.delectBook = this.delectBook.bind(this)

    this.state = {transactions: []};
  }

  componentDidMount() {
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

  delectBook(id) {
    const exist = localStorage.getItem('myData')
    axios.delete('http://localhost:5000/api/v3/transactions/'+id,{
      headers:{
        'Authorization': `Bearer ${exist}`
      }
    })
    .then(response => { console.log(response.data)});
    this.setState({
      transactions: this.state.transactions.filter(el => el._id !== id)
    })
  }

  transactionList() {
    return this.state.transactions.map(currenttransaction => {
      return <Transaction transaction={currenttransaction} delectBook={this.delectBook} key={currenttransaction._id}/>;
    })
  }

  render() {
    return (
      <div className="container mt-4 mb-5">
        <label className="label">Loan Book History</label>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Book</th>
              <th>title</th>
              <th>number</th>
              <th>Loan date</th>
              <th>Returned date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.transactionList() }
          </tbody>
        </table>
      </div>
    )
  }
}