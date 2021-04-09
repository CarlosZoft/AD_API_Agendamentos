const router = require('express').Router()
const TabelaAgendamento = require("../../models/agendamentos/TabelaAgendamento")
const Agendamento = require("../../models/agendamentos/Agendamentos")

router.get('/', async (req , res) => {
    const results = await TabelaAgendamento.listar()
    res.send(JSON.stringify(results));
})

router.post('/', async (req , res) => {
    const reqAgendamento = req.body;
    const agendamento = new Agendamento(reqAgendamento);
    await agendamento.criar();
    res.send(JSON.stringify(agendamento))
})
router.get('/:id', async (req,res)=>{
    try {
        const id = req.params.id;
        const agendamento = new Agendamento({id:id});
        await agendamento.buscar();
        res.send(JSON.stringify(agendamento));
    }catch(error){
        res.send(JSON.stringify({
            mensage: error.mensage
        }))
    }
})
router.put('/:id', async(req , res) => {
    const id = req.params.id;
    const Att = req.body;
    Att.id = id;
    console.log(Att);
    const agendamento = new Agendamento(Att);

    try {
        await agendamento.atualizar();
        res.status(200).send("Atualizado com sucesso xD")
    }
    catch(error){
        res.status(404).send("Não atualizado :*(")
    }
})
router.delete('/:id', async(req,res) => {
    try{
        const id = req.params.id;
        const agendamento = new Agendamento({id:id});
        await agendamento.excluir();
        res.status(204).send(JSON.stringify(`Usuário de id : ${id} removido com sucesso!`));
    }
    catch(error){
        res.send(JSON.stringify({
            mensage: error.mensage
        }))
    }  
})
module.exports = router;