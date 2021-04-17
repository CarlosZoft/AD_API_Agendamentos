const router = require('express').Router()
const servicoAgendamento = require("../../services/agendamentos")
const passport = require('passport');

router.get('/', 
    passport.authenticate('bearer', {session: false}),
    servicoAgendamento.carregarTodosAgendamentos
)

router.post('/', 
    passport.authenticate('bearer', {session: false}),
    servicoAgendamento.criarAgendamento
)

router.get('/:id', 
    passport.authenticate('bearer', {session: false}),
    servicoAgendamento.carregarAgendamento
)

router.put('/:id', 
    passport.authenticate('bearer', {session: false}),
    servicoAgendamento.alterarAgendamento
)

router.delete('/:id',
    passport.authenticate('bearer', {session: false}),
    servicoAgendamento.deletarAgendamento
)
module.exports = router;