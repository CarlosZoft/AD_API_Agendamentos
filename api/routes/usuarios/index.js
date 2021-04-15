const router = require('express').Router();
const SerializadorUsuario = require('../../Serializar').SerializarUsuario;
const tabelaUsuario = require('../../controllers/usuarios/TabelaUsuarios');
const Usuario = require('../../controllers/usuarios/Usuario');

router.get('/', async (req, res, next) => {
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
});

router.post('/usuarios', async(req, res, next) => {
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
});

router.get('/:idUsuario', async (req, res, next) => {

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

});

router.put('/:idUsuario', async (req, res, next) => {
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
})


module.exports = router;