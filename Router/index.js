const express = require('express');
const app = express();
const productRouter = express.Router();

// определяем маршруты и их обработчики внутри роутера
productRouter.use('/create', (req, res)=>{
  res.send('Добавление товара');
});

productRouter.use('/:id', (req,res)=>{
  res.send(`Товар №${req.params.id}`);
});

productRouter.use('/', (req, res)=>{
  res.send('Список товаров');
});

// сопотавляем роутер с конечной точкой "/products"
app.use('/products', productRouter);

app.use('/about', (req, res)=>{
  res.send('О нас');
});

app.use('/', (req, res)=>{
  res.send('Главная страница');
});

app.listen(3000);