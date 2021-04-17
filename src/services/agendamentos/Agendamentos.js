const tabela_agendamento = require('../../models/agendamentos/TabelaAgendamento');
const CampoInvalido = require('../../errors/CampoInvalido');
const DadosNaoInformados = require('../../errors/DadosNaoInformados');
const NaoEncontrado = require('../../errors/NaoEncontrado');

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
        this.camposATT = ['nome_cliente', 'nome_servico', 'status', 'data_agendamento']
    }

    async criar() {
        this.validar()
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
        if(!result){
            throw new NaoEncontrado();
        }
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

        const dadosAtualizar = {}
        await tabela_agendamento.buscarPorID(this.id)
            .then(async () => {
                this.camposATT.forEach((campo) => {
                    const valor = this[campo];
                    if(typeof valor === 'string' && valor.length > 0) {
                        dadosAtualizar[campo] = valor
                    }
                });
                if(Object.keys(dadosAtualizar).length === 0){
                    throw new DadosNaoInformados();
                };
            
                await tabela_agendamento.editar(dadosAtualizar, this.id);
            })
            .catch(error => {
                throw error;
            })
               
    }
    validar() {
        this.camposATT.forEach(campo =>{
            const valor = this[campo];
            if(typeof valor !== 'string' || valor.length === 0){
                throw new CampoInvalido(campo);
            } 
        })
    }
}
module.exports = Agendamento;