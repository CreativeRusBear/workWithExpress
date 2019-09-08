const express = require('express');
const app = express();

app.use(express.static(`${__dirname}/public`));

app.use('/', (req, res)=>{
  res.send('<h1>Main page</h1>')
});

app.listen(8000);