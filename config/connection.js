const { connect, connnection } = require('mongoose');

connect('mongodb://127.0.0.1:27017/socialNetworkDB');

module.exports = connection;