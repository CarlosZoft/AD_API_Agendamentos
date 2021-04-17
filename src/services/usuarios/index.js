const SerializadorUsuario = require('../../shared/Serializar').SerializarUsuario;
const tabelaUsuario = require('../../models/usuarios/TabelaUsuarios');
const Usuario = require('../../services/usuarios/Usuario');


module.exports = 
{
    criaUsuario : async(req, res, next) => {
        try {
    
            const reqUsuarios = req.body;
            const usuario = new Usuario(reqUsuarios);
            await usuario.criar();
            const serializador = new SerializadorUsuario(
                res.getHeader('Content-Type')
            );
            res.status(201).send(serializador.transformar(usuario));
    
        }
        catch(error){
            next(error);
        }
    },
    carregarUsuarios: async (req, res, next) => {
        try{
            const results = await tabelaUsuario.listar();
            const serializador = new SerializadorUsuario(
                res.getHeader('Content-Type')
            );
            res.status(200).send(serializador.transformar(results)); 
        }
        catch(error){
            next(error);
        }
    },
    carregarUsuario : async (req, res, next) => {

        try {
            const id = req.params.idUsuario;
            const usuario = new Usuario({id: id})
            await usuario.buscarPorID();
            const serializador = new SerializadorUsuario(
                res.getHeader('Content-Type')
            )
            res.status(200).send(serializador.transformar(usuario));
        }
        catch(error){
            next(error);
        }
    
    },
    alterarUsuario : async (req, res, next) => {
        try {
            const id = req.params.idUsuario;
            const dadosBody = req.body;
            const dados = Object.assign({}, dadosBody, {id: id});
            const usuario = new Usuario(dados);
            await usuario.atualizar();
            const serializador = new SerializadorUsuario(
                res.getHeader('Content-Type')
            )
            res.status(204).send(serializador.transformar(usuario));
        }
        catch(error){
            next(error);
        }
    },
    removeUsuario : async (req,res,next) => {
        try {
            const id = req.params.idUsuario
            const usuario = new Usuario({id:id})
            await usuario.remover()
            res.send(204).send()
        }catch(error){
            next(error)
        }

    }

    













}