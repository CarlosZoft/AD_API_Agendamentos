const router = require('express').Router()
const TabelaAgendamento = require("../../models/agendamentos/TabelaAgendamento");
const Agendamento = require("../../models/agendamentos/Agendamentos");
const SerializadorAgendamento = require('../../Serializar').SerializarAgendamento;

router.get('/', async (req , res) => {
    try{
        const results = await TabelaAgendamento.listar()
        const serializador = new SerializadorAgendamento(
            res.getHeader('Content-Type'),
            ['nome_servico']
        );
        agendamentos = serializador.transformar(results);
        res.status(200).send(agendamentos);
    }
    catch(error){
        res.send(error);
    }
    
})

router.post('/', async (req , res) => {
  try {
    
        const reqAgendamento = req.body;
        const agendamento = new Agendamento(reqAgendamento);
        await agendamento.criar();
        res.send(JSON.stringify(agendamento))

  } catch (error){
    
        res.send(error);
  
    }
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
    try {    
        const id = req.params.id;
        const Att = req.body;
        Att.id = id;
        console.log(Att);
        const agendamento = new Agendamento(Att);
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