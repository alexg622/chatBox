const express = require('express');
const mongoose = require('mongoose')
const users = require('./routes/api/users')
const bodyParser = require('body-parser')
const db = require('./.git/keys').mongoURI
const app = express()

mongoose.connect(db).then(() => console.log("mongoDB is connected")).catch(err => console.log(err))


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/test', (req, res) => res.send("working"))

app.use('/api/users', users)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))
