const express = require('express');
const app = express();

app.use('/home/info', (req, res)=>{
  res.redirect('/about');
});
app.use('/index', (req, res)=>{
  res.redirect('https://github.com/CreativeRusBear');
});
app.use('/home', (req, res)=>{
  res.redirect('about');
});
app.use('/about', (req, res)=>{
  res.send('<h1>About us</h1>');
});


app.listen(8000);