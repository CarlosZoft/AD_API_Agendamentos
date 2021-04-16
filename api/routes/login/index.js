const router = require('express').Router();
const controllerUsuario = require('../../controllers/usuarios/controller');
const passport = require('passport');

router.post('/', passport.authenticate('local',{session:false}),
    controllerUsuario.login
);

module.exports = router;