const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')


const app = express();
app.use(cors())
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', 'views');

const userRoutes = require('./routes/user');

const sequelize = require('./util/databse');


// const User = require('./models/user');
// User.sync().then().catch(err => console.log(err));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', userRoutes);


sequelize.sync().then((result) => {
    app.listen(4000);
}).catch(() => {
    console.log(err);
});

