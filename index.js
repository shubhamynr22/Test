const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');

const PORT = 3000;

app.get('/files', function (req, res) {
  const filesPath = path.join(__dirname, 'files');
  fs.readdir(filesPath, function (err, data) {
    if (err) {
      res.status(400).send('Error reading files');
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/files/:fileName', function (req, res) {
  const name = req.params.fileName;
  const filePath = path.join(__dirname, 'files', name);
  console.log(filePath);

  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      console.log(err);
      res.status(500).send('File not found');
    } else {
      console.log(data);
      res.status(200).send(data);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
