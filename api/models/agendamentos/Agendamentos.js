const tabela_agendamento = require('./TabelaAgendamento');

class Agendamento {
    constructor({id,nome_cliente,nome_servico,status, data_agendamento,
        data_criacao, data_atualizacao}) {
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
            nome_cliente : this.nome_cliente,
            nome_servico : this.nome_servico,
            status : this.status, 
            data_agendamento : this.data_agendamento
        });
        this.id = result.id;
        this.data_criacao = result.data_criacao;
        this.data_atualizacao = result.data_atualizacao;
    }
    async buscar() {
        const result = await tabela_agendamento.buscarPorID(this.id);
        this.nome_cliente = result.nome_cliente;
        this.nome_servico = result.nome_servico;
        this.status = result.status;
        this.data_agendamento = result.data_agendamento;
        this.data_criacao = result.data_criacao;
        this.data_atualizacao = result.data_atualizacao;
    }
    async excluir() {
        await tabela_agendamento.remover(this.id);
    }
    async atualizar() {
        await tabela_agendamento.buscarPorID(this.id)
            .then(
            await tabela_agendamento.editar({
                    nome_cliente : this.nome_cliente,
                    nome_servico : this.nome_servico,
                    status : this.status, 
                    data_agendamento : this.data_agendamento
                }, this.id)
            )
            .catch(error => 
                console.error(error)
            )
    }
}
module.exports = Agendamento;