const express = require('express');
const hbs = require('hbs');
const expressHbs = require('express-handlebars');
const app = express();

app.set('view engine', 'hbs');
app.engine('hbs', expressHbs({
  layoutsDir: 'views/layouts',
  defaultLayout: 'layout',
  extname: 'hbs'
}));

hbs.registerPartials(`${__dirname}/views/partials`);

app.use('/contact', (req,res)=>res.render('contact.hbs',{
  title: 'My contacts',
  isEmailVisible: true,
  emails: ['mycompany@gmail.com', 'bigcompany@gmail.com'],
  phone: '+1234567890'
}));

app.use('/', (req, res)=>res.render('home.hbs'));

app.listen(8000);