const express = require ('express');
const router = express.Router();
const userController = require ('../controllers/userController');
const multer = require('multer');
const path = require('path');
const registerValidator = require('../validators/registerValidator');
const loginValidator = require('../validators/loginValidator')
const guestMiddleware = require('../middlewares/guestMiddleware');




var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/uploads/avatars'));
    },
    filename: function (req, file, cb) {
        console.log()
        cb(null, req.body.email + '-' + Date.now() + path.extname(file.originalname))
    }
})
   
var upload = multer({ storage: storage })

router.get('/register',guestMiddleware, userController.register );
router.post('/register',upload.single('avatar'), registerValidator,userController.save );

router.get('/login',guestMiddleware, userController.login );
router.post('/login', loginValidator ,userController.logged );
router.get('/logout',userController.logout )



module.exports = router;