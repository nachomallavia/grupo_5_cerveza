module.exports = (req, res, next) => {
    if (req.session.usuarioLogueado != undefined) {
        res.locals.usuarioLogueado = req.session.usuarioLogueado
    }
    next()
}