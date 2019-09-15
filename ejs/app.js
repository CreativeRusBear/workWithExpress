const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use('/contact', (req, res) => {
  res.render('contact', {
    title: 'contacts',
    emailsVisible: true,
    emails: ['mycompany@gmail.com', 'bigcompany@gmail.com'],
    phone: '+1234567890'
  });
});
app.use('/', (req, res) => res.send('Main page'));

app.listen(8000);