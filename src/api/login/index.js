const router = require('express').Router();
const servicoLogin = require('../../services/login');
const passport = require('passport');

router.post('/', passport.authenticate('local',{session:false}),
    servicoLogin.login
);

module.exports = router;