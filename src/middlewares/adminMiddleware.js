module.exports = (req, res, next) => {
    if (req.session.usuarioLogueado != undefined) {
        if(req.session.usuarioLogueado.id_user_type != 2){
            return res.redirect('/');
        }
    }next();
}