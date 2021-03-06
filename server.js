const express = require("express");
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || '4002';
const path = require('path');
// const http = require('http');


app.use(cors());

const request = require("request-promise").defaults({

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
});

app.use(bodyParser.urlencoded({extended: true}));

if(process.env.NODE_ENV === 'production') {

app.use(express.static(path.join(__dirname, '/client/build/')));




// //must be set like this so that it reloads with heroku deploy!!!
app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/client/build/index.html'));
  });
}

app.listen(PORT, function () {
  console.log(`Server is running on port:, ${PORT}`);
});