const tabela_agendamento = require('./TabelaAgendamento');

class Agendamento {
    constructor({id,nome_cliente,nome_servico,status, data_agendamento,data_criacao, data_atualizacao}) {
        this.id = id;
        this.nome_cliente = nome_cliente;
        this.nome_servico = nome_servico;
        this.status = status;
        this.data_agendamento = data_agendamento;
        this.data_criacao = data_criacao;
        this.data_atualizacao = data_atualizacao;
    }

    async criar() {
        const result = await tabela_agendamento.adicionar({
            nome_cliente = this.nome_cliente,
            nome_servico = this.nome_servico ,
            status = this.status, 
            data_agendamento = this.data_agendamento
        });
        this.id = result.id;
        this.data_criacao = result.data_criacao;
        this.data_atualizacao = result.data_atualizacao;
    }
}
module.exports = Agendamento;