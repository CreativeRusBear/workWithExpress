const express = require('express');
const app = express();

app.get('/info/categories/:category/products/:product', (req, res)=>{
  const category = req.params['category'];
  const product = req.params['product'];
  res.send(`<p>Category: ${category}</p><p>Product: ${product}</p>`);
});

app.listen(3000);