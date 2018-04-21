import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';

let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const peopleContractABI = [{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"people","outputs":[{"name":"firstName","type":"bytes32"},{"name":"lastName","type":"bytes32"},{"name":"age","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_firstName","type":"bytes32"},{"name":"_lastName","type":"bytes32"},{"name":"_age","type":"uint256"}],"name":"addPerson","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getPeople","outputs":[{"name":"","type":"bytes32[]"},{"name":"","type":"bytes32[]"},{"name":"","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"}];

const peopleContractAddress = `0x568cca256a4268f31fded2669e85fddee7d3d341`;
const peopleConstract = web3.eth.contract(peopleContractABI).at(peopleContractAddress);
web3.eth.defaultAccount = web3.eth.accounts[0];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNames: [],
      lastNames: [],
      ages: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetState = this.resetState.bind(this);
    this.getCountTableRows = this.getCountTableRows.bind(this);
  }

  getPeople() {
    return peopleConstract.getPeople();
  }

  addPeople(firstName, lastName, age) {
    peopleConstract.addPerson(firstName, lastName, age);
  }

  handleSubmit(event) {
    event.preventDefault();
      event.target.firstname.value &&
      event.target.lastname.value &&
      event.target.age.value &&
      this.setState({
        firstNames: this.state.firstNames.concat([web3.fromAscii(event.target.firstname.value)]),
        lastNames: this.state.lastNames.concat([web3.fromAscii(event.target.lastname.value)]),
        ages: this.state.ages.concat([event.target.age.value.toString()])  
      }, this.addPeople(
        event.target.firstname.value,
        event.target.lastname.value,
        event.target.age.value
      ));
  }

  resetState() {
    const data = this.getPeople();
    console.log(data);
    this.setState({
      firstNames: String(data[0]).split(','),
      lastNames: String(data[1]).split(','),
      ages: String(data[2]).split(',')
    });
  }

  getCountTableRows() {
    return !!this.state.firstNames.length;
  }

  componentWillMount() {
    this.resetState();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h5 className="App-title">Welcome to the Blockchain DApp</h5>
        </header>
        {/* <div className="form-group search-form">
          <small className="counter">2 items</small>
          <input type="text" className="search form-control" placeholder="What are you looking for?" />
        </div> */}
        <table border="0" className="table-bordered">
          <tbody>
            <tr>
              <th>B</th>
              <th className="col-5">First Name</th>
              <th className="col-4">Last Name</th>
              <th className="col-3">Age</th>
            </tr>
            {this.getCountTableRows() ? 
              null :
              <tr className="warning no-result">
                <td colspan="4">No results</td>
              </tr>
            }
            {this.state.firstNames.map((name, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{web3.toAscii(this.state.firstNames[index].toString())}</td>
                <td>{web3.toAscii(this.state.lastNames[index].toString())}</td>
                <td>{this.state.ages[index].toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="form-group">
          <form onSubmit={this.handleSubmit}>
            <div className="inputField col-12">
              <label className="col-2">
                First name:{' '}
              </label>
              <input className="form-control col-3" id="inputFirstName" type="text" name="firstname" />
            </div>
            <div className="inputField col-12">
              <label className="col-2">
                Last name:{' '}
              </label>
              <input className="form-control col-3" type="text" name="lastname" />
            </div>
            <div className="inputField col-12">
              <label className="col-2">
                Age:{' '}
              </label>
              <input className="form-control col-3" type="text" name="age" />
            </div>
            <input className="form-control col-2 btn btn-primary" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default App;
