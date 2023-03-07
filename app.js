const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors());
const UserRouter = require('./Router/userRouter');
const ActiveRouter = require('./Router/authRouter');
const FoodRouter = require('./Router/foodRouter');
app.use(express.static(path.join(__dirname, 'Uploads')));
app.use(express.static(path.join(__dirname, 'FoodPic')));




mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology : true
    })
    .then(() => {
        console.log('Mongoose connected')
    })
    .catch(err => console.log(err));

app.use('/', UserRouter)
app.use('/', ActiveRouter);
app.use('/' , FoodRouter);

app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})
