const express = require('express');
const app = express();

app.get('/', (req, res)=>{
  res.send('<h1>Main page</h1>')
});

app.use('/about', (req, res)=>{
  const id = req.query.id;
  const name = req.query.name;
  if (name && id)  res.send(`<h1>Info page</h1><p>id: ${id}</p><p>name: ${name}</p>`);
  else   res.send('<h1>Info page</h1>');

});

app.listen(3000);