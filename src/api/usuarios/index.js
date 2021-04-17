const router = require('express').Router();
const servicoUsuario = require('../../services/usuarios')
const passport = require('passport');

router.get('/', 
    passport.authenticate('bearer', {session: false}),
    servicoUsuario.carregarUsuarios
);

router.post('/', 
    passport.authenticate('bearer', {session: false}),
    servicoUsuario.criaUsuario
)
router.get('/:idUsuario', 
    passport.authenticate('bearer', {session: false}),
    servicoUsuario.carregarUsuario
);

router.put('/:idUsuario', 
    passport.authenticate('bearer', {session: false}),
    servicoUsuario.alterarUsuario
)

router.delete('/:idUsuario', 
    passport.authenticate('bearer', {session: false}),
    servicoUsuario.removeUsuario
)


module.exports = router;