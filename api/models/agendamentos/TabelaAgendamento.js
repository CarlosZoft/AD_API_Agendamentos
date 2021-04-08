const modelAgendamento = require('./Agendamento');

module.exports = {

    async listar() {
        return await modelAgendamento.findAll({
            raw:true,
        });
    },

    async adicionar(agendamento){
        return await modelAgendamento.create(agendamento);
    },

    async buscarPorID(id) {
        return await modelAgendamento.findByPk(id)
    },

    async remover(id){
        return await modelAgendamento.destroy({
            where: {
                id : id
            }
        })
    }

}