const modelAgendamento = require('./Agendamento');

module.exports = {

    async listar() {
        return await modelAgendamento.findAll({
            raw:true,
        });
    },

    async adicionar(agendamento){
        return await modelAgendamento.create(agendamento);
    }

}