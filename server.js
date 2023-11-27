const express = require('express');
const mongoose = require("mongoose");
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://sysdba:sysdba@cluster0.fq3vo.mongodb.net/bajaPelagica?retryWrites=true&w=majority')
.then(() => {
    console.log('Successfully connected to the database')
})

.catch((err) => console.log('Could not connect to the database', err));

const db = mongoose.connection;

// ROUTER
const pokeRouter = require("./routes/poke");


const app = express();
/* CORS CONFIG */
const corsOptions = {
    //origin: 'http://localhost:4200',
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowHeaders: ['*'],
    credentials: true
}
app.use(express.json())
app.use(cors(corsOptions));
app.use(express.json({limit:'50mb'}));
app.use("/", pokeRouter);

app.listen(process.env.PORT || 3000, () => console.log(`server has started at port ${process.env.PORT | 3000}`));