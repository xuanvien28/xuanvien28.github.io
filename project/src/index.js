const express = require('express')
const app = express()
const path = require('path') //path
const morgan = require('morgan')  //morgan
//const handlebars = require('express-handlebars') //handlebars
const hbs  = require('express-handlebars');
const port = 3000
const cookieParser = require('cookie-parser');
const route = require('./routes') //import routes
const db = require('./config/db') //import db từ db/index.js
const showUser = require('./app/middlewares/showUser'); // middleware tự thêm username vào view

db.connect(); //connect to db

//HTTP logger
// app.use(morgan('combined'))

// Template engine
app.engine('hbs', hbs.engine({
  extname: '.hbs'
}));

app.use(cookieParser());
app.use(showUser); 

app.use(express.static(path.join(__dirname, 'public'))); //set tệp tĩnh, lấy hình
// app.use('gis', express.static(path.join(__dirname, 'src/gis')));

app.use(express.urlencoded({ extended: true })); //nhận dữ liệu từ form
app.use(express.json()); //nhận dữ liệu từ form

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname,'src','resource','views')); // Set the views directory
app.set('views', path.join(__dirname,'resource','views')); // Set the views directory

// console.log('path', path.join(__dirname,'resources/views'));

//khởi tạo route

route(app); 



app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`)
})
