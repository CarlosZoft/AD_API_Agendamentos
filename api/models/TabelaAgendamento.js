const modelAgendamento = require('./Agendamento');

module.exports = {

    async listar() {
        return await modelAgendamento.findAll({
            raw:true,
        });
    }

}