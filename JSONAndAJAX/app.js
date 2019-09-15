const express = require('express');
const app = express();
const jsonParser = express.json();

app.post('/user', jsonParser, (req,res)=>{
  if (!req.body) return res.sendStatus(400);
  console.info(req.body);
  res.json(req.body);
});

app.get('/', (req, res)=>res.sendFile(`${__dirname}/register.html`));

app.listen(8000);