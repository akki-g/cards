const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://<username>:<password>@cluster0-4pisv.mongodb.net/COP4331?retryWrites=true&w=majority';
const client = new MongoClient(url);
client.connect();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Ensure correct parsing of JSON

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.post('/api/login', async (req, res, next) => {
    let error = '';
    const { login, password } = req.body;
    let id = -1, fn = '', ln = '';
    if (login.toLowerCase() === 'rickl' && password === 'COP4331') {
      id = 1; fn = 'Rick'; ln = 'Leinecker';
    } else {
      error = 'Invalid user name/password';
    }
    res.status(200).json({ id, firstName: fn, lastName: ln, error });
  });
  

app.listen(5000); // Start server on port 5000
