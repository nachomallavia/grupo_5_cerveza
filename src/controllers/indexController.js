module.exports = {
    home: (req, res) => {
        return res.render('main/index', {
            user: req.session.usuarioLogueado
        });
    }
}