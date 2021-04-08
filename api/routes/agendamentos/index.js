const router = require('express').Router()
const TabelaAgendamento = require("../../models/agendamentos/TabelaAgendamento")
const Agendamento = require("../../models/agendamentos/Agendamento")

router.get('/', async (req, res) => {
    const results = await TabelaAgendamento.listar()
    res.send(JSON.stringify(results));
})

router.post('/', async (req,res) => {
    const reqAgendamento = req.body;
    const agendamento = new Agendamento(reqAgendamento);
    await agendamento.criar();
    res.send(JSON.stringify(agendamento))
})
module.exports = router;