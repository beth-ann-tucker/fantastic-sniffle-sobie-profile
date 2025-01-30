const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser")
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI;

// console.log(uri);

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'))


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

//run().catch(console.dir);

async function getData(){

  await client.connect();
  let collection = await client.db("sobie-profile-database").collection("sobie-profile-data");

  let results = await collection.find({}).toArray();
    //.limit(50)
    //.toArray();
  
  console.log(results)

  return results;

}

app.get('/read', async function (req, res){
  let getDataResults = await getData();
  console.log(getDataResults);
  res.render('names', { nameData: getDataResults});
})

getData();


//begin all my middlewears

app.get('/', function (req, res) {
  res.sendFile('index.html');
})

app.get('/ejs', function (req, res) {
  res.render('words', {
    pageTitle: "my ejs page"
  });
})

app.get('/helloRender', function (req, res) {
  res.send('Hello Express from Real World<br><a href="/">back to home</a>')
})

app.get('/saveMyName', (req, res)=>{
  console.log('Did we hit the get endpoint?');

  console.log('req.query: ', req.query);

  console.log('req.query: ', req.params);

  let reqName = req.query.myNameGet;

  res.render('words', {pageTitle: reqName});
})

app.post('/saveMyName', (req, res)=>{
  console.log('Did we hit the post endpoint?');

  console.log(req.body);

  //res.redirect('/ejs');

  res.render('words', {pageTitle: req.body.myName});
})

app.listen(port, ()=> console.log (`server is running on ... local host:${port}`));
