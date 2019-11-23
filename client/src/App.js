import React, { Component } from 'react';
import pic from "./picUnavailable.jpg";
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
      items: 0

    };
    this.handleSkip = this.handleSkip.bind(this);
    this.handleSkipBack = this.handleSkipBack.bind(this)
    this.handleSearchTerm = this.handleSearchTerm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTotals = this.handleTotals.bind(this);
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
    const json = await response.json();
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

  //This is working handleSkip :)
  handleSkip(){
    this.setState({ skipping: this.state.skipping + 20})
    console.log(this.state.skipping, "skip")
  }
  handleSkipBack(){
    this.setState({skipping: this.state.skipping - 20})
    console.log(this.state.skipping, "skipback")
  }
  handleTotals(){
    if(this.state.items){
      this.setState({items: this.state.json.items})

    }else{
     this.setState({items: this.state.json.other.length})
    }
  }

  render() {
    let itemsArray=[]
    let itemsArrayWithout=[0]
    // let display = 0
    let products = null;
    let products1 = null

    if (this.state.json.list) {
      itemsArray.push(this.state.json.total)
      console.log(this.state.json.list, "json2")
      products = this.state.json.list.map(product => {

        console.log(itemsArray, "items array")
        return (
          <div key={product._id}>
            <div>{product.meta.brand}</div>
            <div>{product.name}</div>

            <img width="300" src={product.image.source} alt="productPics"/>
            <div>{product.store.priceDisplay}</div>
            <div></div>
            <br/>
          </div>
        )
      })
    } if(this.state.json.other){
      itemsArrayWithout.shift()
      itemsArrayWithout.push(this.state.json.other.length)

      console.log("this item has no pic and no list arrray")
      products1=this.state.json.other.map(product1 => {
        return(
          <div>
          <div key={product1.name} >
            <div>{product1.meta.brand}</div>
            <div>{product1.name}</div>
            <img width="300" src={pic} alt="productPics"/>
            {/*<div>{product1.store.price}</div>*/}
            <div></div>
            <br/>
          </div>
          </div>
        )
      })
    }
    return (
      <div className="App">
        <h2>Bee Caves Item Search</h2>

        <form className="form-inline" onSubmit={this.handleSubmit}>
          <div className="form-group">

          <input
            type="text"
            className="form-control mx-sm-3"
            value={this.state.searchTerm}
            onChange={this.handleSearchTerm}
          />
          <input type="submit" className="btn btn-info" value="Search"/>
          </div>
        </form>
        <h3>There are {itemsArray} results for this search</h3>
        <h3>And there are {itemsArrayWithout} secondary results</h3>

        <form onSubmit={this.handleSubmit}>
          <div>
        {/*<form onSubmit={this.handleSkip}>*/}

        <button className="btn btn-primary" onClick={this.handleSkip}>Load More</button>
          </div>
        </form>
        {products}
        {products1}
        <form onSubmit={this.handleSubmit}>
          <button className="btn btn-primary" onClick={this.handleSkipBack}>Load Less</button>
        </form>

      </div>
    );
  }
}

export default App;