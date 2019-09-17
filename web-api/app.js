const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const jsonParser = bodyParser.json();

app.use(express.static(`${__dirname}/public`));

/**
 * @summary Получение списка данных
 */
app.get('/api/users', (req, res) => res.send(getData(req)));

/**
 * @summary Получение одного пользователя по id
 */
app.get('/api/users/:id', (req, res)=>{
  const {id, users} = getData(req);
  const user = getUser({id, users});
  (user) ? res.send(user) : res.sendStatus(404).send();
});

/**
 * @summary Получение отправленных данных
 */
app.post('/api/users', jsonParser, (req, res)=>{
  if (!req.body) return res.sendStatus(400);
  const users = getData(req);
  const id = (users.length) ? users[users.length-1].id+1 : 1;
  const user = {id, name: req.body.name, age: req.body.age};
  users.push(user);
  fs.writeFileSync('users.json', JSON.stringify(users));
  res.send(user);
});

/**
 * @summary Удаление пользователя по id
 */
app.delete('/api/users/:id', (req, res)=> {
  const {id, users} = getData(req);
  let index = -1;
  users.forEach((person, i) => {
    if (person.id !== id) return false;
    index = i;
  });
  if (index === -1) return res.status(404).send();
  const user = users.splice(index, 1)[0];
  const data = JSON.stringify(users);
  fs.writeFileSync('users.json', data);
  res.send(user);
});

/**
 * @summary Изменение пользователя
 */
app.put('/api/users', jsonParser, (req, res)=>{
  if (!req.body) return res.sendStatus(400);
  const {id, users} = getData(req, 'body');
  const user = getUser({id, users});

  if (!user) res.status(404).send(user);
  user.age = req.body.age;
  user.name = req.body.name;
  const data = JSON.stringify(users);
  fs.writeFileSync('users.json', data);
  res.send(user);
});


/**
 *
 * @param req
 * @return {{id: *, users: *}}
 */
function getData(req, property = 'params') {
  const content = fs.readFileSync('users.json', 'utf8');
  const users = JSON.parse(content);

  const getIdVal = req[property] && req[property].id;
  return (getIdVal) ? {id: +req[property].id, users} : users;
}

/**
 *
 * @param id
 * @param users
 * @return {*}
 */
function getUser({id, users}) {
  let user = null;
  users.forEach((person)=>{
    if (person.id !== id) return false;
    user = person;
  });
  return user;
}

app.listen(8000, () => console.log(`Server run on http://127.0.0.1:8000`));
