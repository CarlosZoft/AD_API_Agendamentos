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
        const agendamentosFiltrados = serializador.transformar(results);
        res.status(200).send(agendamentosFiltrados);
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
        const serializador = new SerializadorAgendamento(
            res.getHeader('Content-Type'),
            ['nome_servico']
        );
        const agendamentoFiltrado = serializador.transformar(agendamento);
        res.status(200).send(agendamentoFiltrado);

  }catch (error){
    
        res.send(error);
  
    }
})

router.get('/:id', async (req,res)=>{
    try {
        
        const id = req.params.id;
        const agendamento = new Agendamento({id:id});
        await agendamento.buscar();
        const serializador = new SerializadorAgendamento(
            res.getHeader('Content-Type'),
            ['nome_servico']
        );
        const agendamentoFiltrado = serializador.transformar(agendamento)
        res.status(200).send(agendamentoFiltrado);

    }catch(error){
        res.status(404).send(JSON.stringify({
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
    }catch(error){
        res.status(404).send("Não atualizado :*(")
    }
})

router.delete('/:id', async(req,res) => {
    try{
        const id = req.params.id;
        const agendamento = new Agendamento({id:id});
        await agendamento.excluir();
        res.status(204).send(JSON.stringify(`Usuário de id : ${id} removido com sucesso!`));
    }catch(error){
        res.status(404).send(JSON.stringify({
            mensage: error.mensage
        }))
    }  
})
module.exports = router;