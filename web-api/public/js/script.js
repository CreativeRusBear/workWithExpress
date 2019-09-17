/**
 * @summary Получение всех пользователей
 * @return {Promise<void>}
 */
async function GetUsers() {
  const users = await fetch('/api/users').then((res)=>res.json());
  users.forEach((user)=>
    document.querySelector('tbody').innerHTML+=createRow(user));
}

/**
 * @summary Получение одного пользователя
 * @param id
 * @return {Promise<void>}
 */
async function GetUser(id) {
  const user = await fetch(`/api/users/${id}`).then((res)=>res.json());
  fillFieldsUserData(user);
}

/**
 * @summary Добавление пользователя
 * @param name
 * @param age
 * @return {Promise<void>}
 */
async function CreateUser(name, age) {
  await fetch('api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({name, age}),
  })
      .then((data)=>data.json())
      .then((user)=>{
        reset();
        document.querySelector('tbody').innerHTML+=createRow(user);
      });
}

/**
 * @summary Изменение пользователя
 * @param id
 * @param name
 * @param age
 * @return {Promise<void>}
 */
async function EditUser(id, name, age) {
  await fetch('api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({id, name, age}),
  })
      .then((data)=>data.json())
      .then((user)=>{
        reset();
        const files = document.querySelector('tbody').querySelectorAll('tr');
        files.forEach((item, index)=>{
          if (+item.attributes[0].value === id) {
            files[index].innerHTML = createRow({id, name, age});
          }
        });
      });
}

/**
 * @summary Заполняет поля необходимыми данными
 * @param id
 * @param name
 * @param age
 */
function fillFieldsUserData({id, name, age}) {
  const form = document.forms['userForm'];
  form.elements['id'].value = id;
  form.elements['name'].value = name;
  form.elements['age'].value = age;
}

/**
 * @summary сброс формы
 */
function reset() {
  const form = document.forms['userForm'];
  form.reset();
  form.elements['id'].value = 0;
}

/**
 * @summary Удаление пользователя
 * @param id
 * @return {Promise<void>}
 */
async function DeleteUser(id) {
  await fetch(`api/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
      .then((data)=>
        data.json())
      .then((user)=>
        document.querySelector(`tr[data-rowid='${user.id}']`).remove());
}

/**
 * @summary Создание строки для таблицы
 * @param id
 * @param name
 * @param age
 * @return {string}
 */
const createRow = ({id, name, age}) => {
  return `<tr data-rowid='${id}'>
        <td>${id}</td>
        <td>${name}</td>
        <td>${age}</td>
        <td>
        <a class='editLink' data-id='${id}'>Изменить</a> |
        <a class='removeLink' data-id='${id}'>Удалить</a>
        </td>
        </tr>`;
};

/**
 * @summary Сброс значений формы
 */
document.querySelector('#reset').addEventListener('click', (e)=>{
  e.preventDefault();
  reset();
});

/**
 * @summary Отправка формы
 */
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  const id = +this.elements['id'].value;
  const name = this.elements['name'].value;
  const age = this.elements['age'].value;
  (id) ? EditUser(id, name, age) : CreateUser(name, age);
});

/**
 * @summary Нажатие на ссылку 'Изменить'
 */
on('body', 'click', '.editLink', (e)=>{
  GetUser(e.target.dataset.id);
});
/**
 * @summary Нажатие на ссылку 'Удалить'
 */
on('body', 'click', '.removeLink', (e) => DeleteUser(e.target.dataset.id));

/**
 * @summary Загрузка пользователей
 */
GetUsers();


/**
 * @param elSelector
 * @param eventName
 * @param selector
 * @param fn
 * @private
 */
function on(elSelector, eventName, selector, fn) {
  const element = document.querySelector(elSelector);

  element.addEventListener(eventName, function(event) {
    const possibleTargets = element.querySelectorAll(selector);
    const target = event.target;
    possibleTargets.forEach((item)=>{
      let el = target;
      while (el && el !== element) {
        if (el === item) {
          return fn.call(item, event);
        }
        el = el.parentNode;
      }
    });
  });
}
