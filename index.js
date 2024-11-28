'use strict';

const express = require('express');
const app = express();

const hbs = require('express-handlebars');
const {createPagination} = require('express-handlebars-paginate');

app.use(express.static(__dirname + '/public'));

// express handlebars
app.engine('hbs', hbs.engine({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layouts',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
  },
  helpers: {
    createPagination,
  }
}))

app.set('view engine', 'hbs');

// cau hinh body-parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', require('./routes/indexRouter.js'));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})
