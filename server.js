const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const minimist = require('minimist');
const isEmpty = require('./validation/is-empty');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const shop = require('./routes/api/shop');

const staticFolder = 'client/build';
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require('./config/keys').mongouri;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.use(passport.initialize());
// Passport Config
require('./config/passport')(passport);

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/shop', shop);
app.use(express.static(staticFolder));

// process user input parameters
const argv = minimist(process.argv.slice(2));
let portFromUserInput = null;
const { port, mode } = argv;
const validPortNumberInput = !isNaN(String(port).split(' ').join('')) && !isEmpty(port);
if (validPortNumberInput) {
  portFromUserInput = port;
}

const portNumber = process.env.PORT || portFromUserInput || 5005;

// Serve static assets if in production
console.log('--------------------------------------');
if (process.env.NODE_ENV === 'production' || mode === 'production') {
  console.log('--> Running in production mode');
  console.log('--> process.env.NODE_ENV: ', process.env.NODE_ENV);
  console.log('--> Serving static from: ', path.resolve(__dirname, 'client', 'build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  console.log('--> Serving backend only');
}

app.listen(portNumber, () => {
  console.log(`--> Server running on port ${portNumber}`);
  console.log('--------------------------------------');
});
