const fs = require('fs');
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'POST, PATCH, GET, DELETE');
  next();
});

app.use('/api/places', placesRoutes);

app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }

  if (res.headerSent) {
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error has occurred' });
});

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.1set5.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

mongoose
  .connect(url, connectionParams)
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch(err => console.log(err));
