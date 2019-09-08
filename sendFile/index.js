const express = require('express');
const app = express();

app.use((req,res)=>{
  const starterPage = ['/', '', '/service-worker.js'];
  if (starterPage.includes(req.url))
    res.sendFile(`${__dirname}/index.html`);
  else
    res.status(404).send('Where is your file?');
});

app.listen(3000);