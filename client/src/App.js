import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      json: {},
      amount: 20,
      searchTerm: "vegan jerky"
    }
    this.handleSearchTerm = this.handleSearchTerm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.fetchProducts(this.state.searchTerm)
  }

  async fetchProducts(searchTerm) {
    const response = await fetch(
      `http://localhost:4000/wholefoods?store=10393&sort=relevance&skip=0&filters&value=${searchTerm}/`
    );
    const json = await response.json()
    this.setState({json});
    console.log(this.state.json, "json1")
  }
  handleSubmit(event){

    event.preventDefault();
    this.fetchProducts(this.state.searchTerm)
  }

  handleSearchTerm(event){
    this.setState({ searchTerm: event.target.value })
  }
  render() {
    let products = null;
    if (this.state.json.list) {
      console.log(this.state.json.list, "json2")
      products = this.state.json.list.map(product => {

        return (
          <div key={product._id}>
            <div>{product.name}</div>
            <img width="300" src={product.image.source}/>
          </div>
        )
      })
    }
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <label>Search</label>
          <input
            type="text"
            value={this.state.searchTerm}
            onChange={this.handleSearchTerm}
          />
          <input type="submit" value="submit"/>
        </form>
        {products}
      </div>
    );
  }
}

export default App;