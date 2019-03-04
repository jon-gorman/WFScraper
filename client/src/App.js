import React, { Component } from 'react';

import './App.css';
// import logo from './logo.svg';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      json: {},
      amount: 20,
      searchTerm: "kale",
      skipping: 0,

    };
    this.handleSkip = this.handleSkip.bind(this);
    this.handleSkipBack = this.handleSkipBack.bind(this)
    this.handleSearchTerm = this.handleSearchTerm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

    this.fetchProducts(this.state.searchTerm)

  }

  async fetchProducts(searchTerm) {
    const response = await fetch(
      // `https://products.wholefoodsmarket.com/api/search?sort=relevance&store=10393&skip=0&filters=%5B%7B%22ns%22%3A%22text%22%2C%22key%22%3A%22text%22%2C%22value%22%3A%22low%20carb%22%7D%5D&limit=1`
      // `http://localhost:4000/wholefoods?store=10393&sort=relevance&skip=${this.state.skipping}&filters&value=${searchTerm}/`
        `https://shrouded-meadow-95377.herokuapp.com/wholefoods?store=10393&sort=relevance&skip=${this.state.skipping}&filters&value=${searchTerm}/`

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

  // handleSkip(){
  //   for(let i = 0; i < this.state.total; i++){
  //     if(this.state.skipping <= this.state.total){
  //       this.setState({skipping: this.state.skipping += 20})
  //     }
  //   }
  // }
  //This is working handleSkip :)
  handleSkip(){
    this.setState({ skipping: this.state.skipping + 20})
    console.log(this.state.skipping, "skip")
  }
  handleSkipBack(){
    this.setState({skipping: this.state.skipping - 20})
    console.log(this.state.skipping, "skipback")
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
        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className="form-group">
          <label>
            <h2>Bee Caves Item Search</h2>
          </label>
            <br/>
          <input
            type="text"
            className="form-control mx-sm-3"
            value={this.state.searchTerm}
            onChange={this.handleSearchTerm}
          />
          <input type="submit" className="btn btn-info" value="Search"/>
          </div>
        </form>
        <h3>There are {this.state.json.total} items for this search</h3>
        <form onSubmit={this.handleSubmit}>
          <div>
        {/*<form onSubmit={this.handleSkip}>*/}

        <button className="btn btn-primary" onClick={this.handleSkip}>Load More</button>
          </div>
        </form>
        {products}
        <form onSubmit={this.handleSubmit}>
          <button className="btn btn-primary" onClick={this.handleSkipBack}>Load Less</button>
        </form>
      </div>
    );
  }
}

export default App;