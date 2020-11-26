const path = require('path');

const controller = {
    register: function(req, res) {
        res.render(path.join(__dirname, '../views/users/register.ejs'))
    },
    login: function(req, res) {
        res.render(path.join(__dirname, '../views/users/login.ejs'))
    }};
    module.exports = controller;