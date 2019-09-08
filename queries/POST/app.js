const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/register', urlencodedParser, (req, res)=>{
  res.sendFile(`${__dirname}/register.html`);
});
app.post('/register', urlencodedParser, (req,res)=>{
  if (!req.body) return res.sendStatus(400);
  console.log(req.body);
  res.send(`<p>Name: ${req.body.userName}</p><p>Age: ${req.body.userAge} years old</p>`);
});
app.get('/', (req,res)=>{
  res.send('<h1>Main page</h1>');
});

app.listen(8000);