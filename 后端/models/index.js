let config = require('../conf/config')
let mongoose = require('mongoose')
let log = require('../utils/log')
let Tag = require('./tag')
let Category = require('./category')
let Artwork = require('./artwork')
let User = require('./user')
let Like = require('./like')

let Teacher = require('./teacher')
let Techer = require('./techerDate')
mongoose.Promise =Promise// require('bluebird')

let mongoUrl = `${config.mongoHost}:${config.mongoPort}/${config.mongoDatabase}`

mongoose.connect(mongoUrl);

let db = mongoose.connection;

db.on('error', (err)=>{
    log.error("connect error:", err);
});

db.once('open', () => {
    log.info('MongoDB is ready')
});


module.exports = {
    User,
    Tag,
    Category,
    Artwork,
    Like,
    Techer,
    Teacher
}