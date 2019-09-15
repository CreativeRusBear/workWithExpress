const express = require('express');
const app = express();

app.set('view engine', 'hbs');

app.use('/contact', (req,res)=>res.render('contact.hbs',{
  title: 'My contacts',
  isEmailVisible: true,
  emails: ['mycompany@gmail.com', 'bigcompany@gmail.com'],
  phone: '+1234567890'
}));

app.use('/', (req, res)=>res.send('<h1>Main page</h1>'));

app.listen(8000);