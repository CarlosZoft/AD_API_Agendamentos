const tabelaUsuario = require('./TabelaUsuarios');
const CampoInvalido = require('../../errors/CampoInvalido');
const CampoQtdMinima = require('../../errors/campoQtdMinima');
const NaoEncontrado = require('../../errors/NaoEncontrado');

class Usuario {
    constructor({id,nome,email, senha, data_criacao, data_atualizacao}){
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.data_criacao = data_criacao;
        this.data_atualizacao = data_atualizacao;
        this.senhaHash = '';
    }

    async criar() {
        const result = await TabelaUsuario.adicionar({
            nome : this.nome,
            email : this.email,
            senha : this.senhaHash
        })
        this.id = result.id;
        this.data_criacao = result.data_criacao;
        this.data_atualizacao = result.data_atualizacao;
    };

    async buscarPorID() {
        const result = await tabelaUsuario.buscarPorID(this.id);
        if(!result){
            throw new NaoEncontrado('Usuario');
        }
        this.nome = result.nome;
        this.email = result.email;
        this.senha = result.senha;
        this.data_criacao = result.data_criacao;
        this.data_atualizacao = result.data_atualizacao;
    };


    async buscarPorEmail() {
        const result = await tabelaUsuario.buscarPorEmail(this.email);
        if(!result){
            throw new NaoEncontrado('Usuario');
        }
        this.id = result.id;
        this.nome = result.nome;
        this.email = result.email;
        this.senha = result.senha;
        this.data_criacao = result.data_criacao;
        this.data_atualizacao = result.data_atualizacao
    }


    async atualizar() {
        await tabelaUsuario.buscarPorID(this.id)
        .then(async () => {
            const camposAtualizaveis = ['nome', 'email', 'senha'];
            const dadosAtualizar  = {}
            camposAtualizaveis.forEach(campo => {
                const valor = this[campo];
                if(typeof valor === 'string' && valor.length > 0){
                    dadosAtualizar[campo] = valor
                } 
            });
            if(Object.keys(dadosAtualizar).length === 0){
                throw new DadosNaoInformados();
            };
            this.validar(camposAtualizaveis);
            await tabelaUsuario.atualizar(this.id, dadosAtualizar);
            
        })
        .catch(error =>{
            throw error;
        })
    }


    async atualizar() {
        await tabelaUsuario.remover(this.id);
    }


    validar() {
        const camposObrigatorios = ['nome', 'email', 'senha'];

        camposObrigatorios.forEach(campo => {
            const valor = this[campo];
            if(typeof valor !== 'string' && valor.length === 0)
                throw new CampoInvalido(campo)
            if(valor.length < 8 && campo === 'senha'){
                throw new CampoQtdMinima(campo);
            }
            if(valor.length > 64 && campo === 'senha'){
                throw new CampoQtdMaxima(campo);
            }
        });
    }
}

module.exports = Usuario;