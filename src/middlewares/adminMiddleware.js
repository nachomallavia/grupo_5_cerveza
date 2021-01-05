module.exports = (req, res, next) => {
    if (req.session.usuarioLogueado != undefined && req.session.usuarioLogueado.email == "admin@email.com") {
        return next();
    }
    return res.redirect('/');
}