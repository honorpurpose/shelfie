require("dotenv").config();
const express = require('express');
const massive = require('massive')
const axios = require('axios');
const controller = require('./controller');
const bodyParser = require('body-parser'); 
const cors = require('cors');


const app = express();

const { PORT, CONNECTION_STRING } = process.env;

app.use(cors());
app.use(bodyParser.json());


massive(CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(err => console.log(err));


app.get('/api/inventory', controller.read)
app.get('/api/inventory/:id', controller.getOne)
app.post('/api/inventory', controller.create)
app.delete('/api/inventory/:id', controller.delete)
app.put('/api/inventory/:id', controller.edit)



app.listen(PORT, () => {
    console.log(`Listening in on ${ PORT }`)
})