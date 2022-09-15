const express = require('express');
const path = require('path');

const app = express();

app.use((req, res, next) => {
    console.log("DENTRO DEL CORS")
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-COntrol-Allow-Request-Method, Access-Control-Allow-Origin');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
}); 
//CONFIGURATIONS
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//ROUTES
app.use(require('./routes/index.routes'));

//STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/assets')));


module.exports = app;