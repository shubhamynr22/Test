const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

const jwtPassword = '123456';
const PORT = 3000;

const ALL_USERS = [
  {
    username: 'harkirat@gmail.com',
    password: '123',
    name: 'harkirat singh'
  },
  {
    username: 'raman@gmail.com',
    password: '123321',
    name: 'Raman singh'
  },
  {
    username: 'priya@gmail.com',
    password: '123321',
    name: 'Priya kumari'
  }
];

function userExists(username, password) {
  for (let i = 0; i < ALL_USERS.length; i++) {
    if (ALL_USERS[i].username == username && ALL_USERS[i].password == password) {
      return true;
    }
  }
  return false;
}

app.post('/signin', function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: 'User doesnt exist in our in memory db'
    });
  }

  var token = jwt.sign({ username: username }, '123456');
  return res.json({
    token
  });
});

app.get('/users', function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    const response = [];
    for (let i = 0; i < ALL_USERS.length; i++) {
      if (!(ALL_USERS[i].username == username)) {
        response.push(ALL_USERS[i]);
      }
    }
    return res.status(200).json({
      msg: 'Successfully verified',
      data: response
    });
  } catch (err) {
    return res.status(403).json({
      msg: 'Invalid token'
    });
  }
});

app.use((err, req, res, next) => {
  console.log(`Error : ${err}`);
  res.json({
    msg: 'Something went wrong'
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
