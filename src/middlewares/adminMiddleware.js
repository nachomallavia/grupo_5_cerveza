module.exports = (req, res, next) => {
    if (req.session.usuarioLogueado != undefined) {
        switch(req.session.usuarioLogueado.email){
            case "admin@email.com":
                return next();
            case "jose@eliopez.com":
                return next();
            case "ianmamotiuk@gmail.com":
                return next();
            case "nacho@eliopez.com":
                return next();
            case "mati@eliopez.com":
                return next();
            default:
        }
    }
    return res.redirect('/');
}