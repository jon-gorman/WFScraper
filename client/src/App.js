import React, { Component } from 'react';

import './App.css';
// import logo from './logo.svg';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      json: {},
      amount: 20,
      searchTerm: "vegan jerky",
      skipping: 0,

    };
    this.handleSkip = this.handleSkip.bind(this);
    this.handleSearchTerm = this.handleSearchTerm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchProducts(this.state.searchTerm)

  }

  async fetchProducts(searchTerm) {
    const response = await fetch(
      // `https://products.wholefoodsmarket.com/api/search?sort=relevance&store=10393&skip=0&filters=%5B%7B%22ns%22%3A%22text%22%2C%22key%22%3A%22text%22%2C%22value%22%3A%22low%20carb%22%7D%5D&limit=1`
      `http://localhost:4000/wholefoods?store=10393&sort=relevance&skip=${this.state.skipping}&filters&value=${searchTerm}/`
      //   `https://shrouded-meadow-95377.herokuapp.com/wholefoods?store=10393&sort=relevance&skip=0&filters&value=${searchTerm}/`

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
  handleSkip(){
    this.setState({ skipping: this.state.skipping + 20})
    console.log(this.state, "skip")
  }

  render() {
    let products = null;
    if (this.state.json.list) {
      console.log(this.state.json.list, "json2")
      products = this.state.json.list.map(product => {
        return (
          <div key={product._id}>
            <div>{product.name}</div>
            <img width="300" src={product.image.source} alt="productPics"/>
            <div>{product.store.priceDisplay}</div>
            <div></div>
            <br/>
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
        <h3>There is {this.state.json.total} items for this search</h3>
        <form onSubmit={this.handleSubmit}>
        <button onClick={this.handleSkip}>Load More</button>
        </form>
        {products}
        <form onSubmit={this.handleSubmit}>
          <button onClick={this.handleSkip}>Load More</button>
        </form>
      </div>
    );
  }
}

export default App;