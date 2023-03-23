const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const expressHbs = require('express-handlebars');
const multer = require('multer');
const {check} = require('express-validator');
var router = express.Router();
var {validationResult} = require('express-validator');

  
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('.hbs',expressHbs.engine({
    extname:"hbs",
    defaultLayout:'main',
}));
app.set('view engine','.hbs');
app.set('views','./view');
app.get('/',function(req,res){
    res.render('defaultView',{layout:'main',

});
app.post('/dangKy',function(req,res,next){
    
    res.render('defaultView',{layout:'login'});
})
let validateRegisterUser = () => {
  return [ 
    check('user.name', 'username does not Empty').not().isEmpty(),
    check('user.name', 'username must be Alphanumeric').isAlphanumeric(),
    check('user.name', 'username more than 6 degits').isLength({ min: 6 }),
    check('user.email', 'Invalid does not Empty').not().isEmpty(),
    check('user.email', 'Invalid email').isEmail(),
    check('user.password', 'password more than 6 degits').isLength({ min: 6 })
  ]; 
}

let validateLogin = () => {
  return [ 
    check('user.email', 'Invalid does not Empty').not().isEmpty(),
    check('user.email', 'Invalid email').isEmail(),
    check('user.password', 'password more than 6 degits').isLength({ min: 6 })
  ]; 
}

let validate = {
  validateRegisterUser: validateRegisterUser,
  validateLogin: validateLogin
};
module.exports = {validate};
router.post('/dangKy', validate.validateRegisterUser(), function (req, res, next) {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
  
    userService.registerUser(req.body.user).then(function (user) {
      return res.json({ user: userService.toAuthJSON(user) });
    }).catch(next);
  });

app.post('/dangNhap',function(req,res,next){
    const data = {
        name:req.body.name,
        pass:req.body.pass,
        email:req.body.email
    }
    res.render('defaultView',{layout:'ql'});
})


});

app.listen(9999);