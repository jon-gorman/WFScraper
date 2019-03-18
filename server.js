const express = require("express");
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || '4000';
const path = require('path');
const http = require('http');

setInterval(function() {
  http.get("https://shrouded-meadow-95377.herokuapp.com");
}, 300000); // every 5 minutes (300000)

app.use(cors());
// const wholeFoodsRoute = express.Router()

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
const request = require("request-promise").defaults({
  // Params:{
  //   sort: "relevance",
  //   store: 10393,
  //   skip: 0,
  //   filters: "%5B%7B%22ns%22%3A%22text%22%2C%22key%22%3A%22text%22%2C%22value%22%3A%22vegan%22%7D%5D",
  //   limit:50
  // }
});
app.get("/wholefoods", async (req, res) =>{
  const sort = "relevance";
  const limit = req.query.limit;
  const skip = req.query.skip;
  const store = req.query.store;
  // const keyword = encodeURIComponent(req.query.value);
  const keyword = (req.query.value);

  // const filters=encodeURIComponent(JSON.stringify([{ns: "text",key:"text", value:`${variables}`}]))
  const filters=`%5B%7B%22ns%22%3A%22text%22%2C%22key%22%3A%22text%22%2C%22value%22%3A%22${keyword}%20%22%7D%5D`;
  // const filters=`%5B%7B%22ns%22%3A%22text%22%2C%22key%22%3A%22text%22%2C%22value%22%3A%22${keyword}%22%7D%5D`
  const url = `https://products.wholefoodsmarket.com/api/search?limit=${limit}&sort=${sort}&store=${store}&skip=${skip}&filters=${filters}`;
  console.log(url);
  const json = await request.get(url);
  res.setHeader("Content-Type", "application/json");
  res.send(json)
})
// wholeFoodsRoute.route('/').get(function (req, res){
//   if(err){
//     console.log(err)
//   } else{
//     res.json(json)
//   }
// })
//original...
// app.get("/wholefoods", async (req, res) =>{
//   const sort = "relevance";
//   const limit = req.query.limit;
//   const skip = req.query.skip;
//   const store = req.query.store;
//   const keyword = encodeURIComponent(req.query.value);
//   // const filters=encodeURIComponent(JSON.stringify([{ns: "text",key:"text", value:`${variables}`}]))
//   const filters=`%5B%7B%22ns%22%3A%22text%22%2C%22key%22%3A%22text%22%2C%22value%22%3A%22${keyword}%22%7D%5D`
//   const url = `https://products.wholefoodsmarket.com/api/search?limit=${limit}&sort=${sort}&store=${store}&skip=${skip}&filters=${filters}`;
//   console.log(url);
//   const json = await request.get(url);
//   res.setHeader("Content-Type", "application/json");
//   res.send(json)
// })


app.use(bodyParser.urlencoded({extended: true}));


if(process.env.NODE_ENV === 'production') {

app.use(express.static(path.join(__dirname, '/client/build/')));
  // app.use(express.static('/client/build/'));



// //must be set like this so that it reloads with heroku deploy!!!
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/client/build/index.html'));
  });
}

app.listen(PORT, function () {
  console.log(`Server is running on port:, ${PORT}`);
});