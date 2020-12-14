const path = require('path');

const controller = {
    register: function(req, res) {
        res.render('users/register.ejs')
    },
    login: function(req, res) {
        res.render('users/login.ejs')
    }
};
    module.exports = controller;