const express = require('express');
const routesAgendamentos = require('../routes/agendamentos');
const routesUsuario = require('../routes/usuarios');
const routesLogin = require('../routes/login');
const FormatoInvalido = require('../errors/FormatoInvalido');
const FormatosValidos = require('../Serializar').FormatosValidos;
const NaoEncontrado = require('../errors/NaoEncontrado');
const CampoInvalido = require('../errors/CampoInvalido');
const CampoQtdMinima = require('../errors/CampoQtdMinima');
const CampoQtdMaxima = require('../errors/CampoQtdMaxima');
const DadosNaoInformados = require('../errors/DadosNaoInformados');
const SerializarErro = require('../Serializar').SerializarErro
const passport = require("../controllers/usuarios/auth");

module.exports = () => {
    const app = express();

    app.use((req, res, next) => {
        let formatoSolicitado = req.header('Accept');
        if(formatoSolicitado === '*/*') {
            formatoSolicitado = 'application/json'
        }
        if(FormatosValidos.indexOf(formatoSolicitado) === -1){
            res.status(406);
            return res.send();
        }
        res.setHeader('Content-Type', formatoSolicitado);
        next();
    })
    
    app.use(express.json());
    app.use('/api/agendamentos', routesAgendamentos);
    app.use('/api/usuarios', routesUsuario);
    app.use('/api/login', routesLogin);

    app.use((error, req, res, next) => {
        let status = 500;
        if(error instanceof CampoInvalido || error instanceof DadosNaoInformados){
            status = 400;
        }
        if(error instanceof NaoEncontrado){
            status = 404;
        }
        if(error instanceof FormatoInvalido){
            status = 406;
        }
        serializarErro = new SerializarErro(
            res.getHeader('Content-Type')
        )
        res.status(status)
            .send(serializarErro.transformar({ id: error.id,
                 mensagem: error.message
                }))
    })

    return app;
};