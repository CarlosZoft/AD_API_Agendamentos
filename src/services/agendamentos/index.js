const SerializadorAgendamento = require('../../shared/Serializar').SerializarAgendamento;
const TabelaAgendamento = require("../../models/agendamentos/TabelaAgendamento");
const Agendamento = require("../../services/agendamentos/Agendamentos");


module.exports = {
    criarAgendamento: async (req , res, next) => {
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
          
              next(error);
        
          }
    },
    carregarAgendamento : async (req,res, next)=>{
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
            next(error);
        }
    },
    carregarTodosAgendamentos: async (req , res, next) => {
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
            next(error);
        }
        
    },
    deletarAgendamento : async(req,res) => {
        try{
            const id = req.params.id;
            const agendamento = new Agendamento({id:id});
            await agendamento.excluir();
            res.status(204).send(JSON.stringify(`Usuário de id : ${id} removido com sucesso!`));
        }catch(error){
            res.status(404).send(JSON.stringify({
                mensagem: error.message
            }))
        }  
    },
    alterarAgendamento : async(req , res, next) => {
        try {    
            const id = req.params.id;
            const Att = req.body;
            Att.id = id;
            console.log(Att);
            const agendamento = new Agendamento(Att);
            await agendamento.atualizar();
            res.status(200).send("Atualizado com sucesso xD")
        }catch(error){
            next(error);
        }
    }   
}