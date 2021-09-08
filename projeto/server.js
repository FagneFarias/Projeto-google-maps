require('dotenv').config();
const express = require('express');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;


app.listen(port, ()=>{
    console.log(`App running on port ${port}.`);
});

const datab = require('./database/postgres');

app.post('/pontos', datab.addPonto);
app.get('/getpontos', datab.getPontos);
