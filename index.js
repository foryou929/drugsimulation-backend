const fs = require('fs')
const https = require('https');

const path = require('path')
const express = require('express')
const env = require('dotenv')
const glob = require('glob')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser');

env.config()

const config = require('./config')

mongoose.connect(config.db_url)
    .then(() => console.log('MongoDB Connected!'));

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false, limit: "5mb" })); // Parses urlencoded bodies
app.use(bodyParser.json({ limit: "5mb" })); // Send JSON responses

glob.sync('./models/**/*.js').forEach(model => {
    require('./' + model)
})

const passportService = require(path.resolve('./utils/passport')); // don't remove this line though this variable is not used.

glob.sync('./routes/**/*.js').forEach(router => {
    require('./' + router)(app)
})

app.use(express.static(path.join(__dirname, "build")));
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT, () => {
    console.log(`Serever is runing at port ${process.env.PORT}`);
});