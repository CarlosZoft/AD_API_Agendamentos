const modelAgendamento = require('./Agendamento');

module.exports = {

    async listar() {
        try{
            return await modelAgendamento.findAll({
                raw:true,
            });
        }
        catch(error){
            throw error;
        }
    },

    async adicionar(agendamento){
        try{
            return await modelAgendamento.create(agendamento);
        }
        catch(error){
            throw error;
        }
        
    },

    async buscarPorID(id) {
        try{
            return await modelAgendamento.findByPk(id)
        }
        catch(error){
            throw error;
        }
    },

    async remover(id){
        try {
            return await modelAgendamento.destroy({
                where: {
                    id : id
                }
            })
        }
        catch(error){
            throw error;
        }
    },
    
    async editar(agendamento, id) {
        try{
            return await modelAgendamento.update(agendamento, {where: {id: id}});
        }
        catch(error){
            throw error;
        }
    }
    
}