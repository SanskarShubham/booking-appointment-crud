const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')


const app = express();
app.use(cors())
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', 'views');

const userRoutes = require('./routes/appointment');

const sequelize = require('./util/database');
const Appointment = require('./models/appointments');
const Meeting = require('./models/meetings');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api', userRoutes);

// Association
Appointment.hasMany(Meeting);
Meeting.belongsTo(Appointment);


sequelize.sync()
//  sequelize.sync({force:true}) 
.then((result) => {
    app.listen(4000);
}).catch((err) => {
    console.log(err);
});

