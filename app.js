const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser")

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'))

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

  console.log(req.query);

  res.redirect('/ejs');
})

app.post('/saveMyName', (req, res)=>{
  console.log('Did we hit the post endpoint?');

  console.log(req.body);

  //res.redirect('/ejs');

  res.render('words', {pageTitle: req.body.myName});
})

app.listen(port, ()=> console.log (`server is running on ... local host:${port}`));
