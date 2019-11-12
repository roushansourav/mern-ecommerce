const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user');
const morgan = require('morgan');
const expressValidator = require('express-validator');
require('dotenv').config();


const app = express();
app.use(expressValidator());
const port = process.env.PORT || 8000;

//middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(morgan('dev'));
//DB Connection

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(()=>console.log('DB Connected'))
.catch((err)=>console.log(err));

//Handling user Endpoints.
app.use('/api',userRoutes);

app.listen(port,()=>console.log(`Server is running on Port ${port}`));