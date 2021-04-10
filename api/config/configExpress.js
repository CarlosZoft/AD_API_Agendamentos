const express = require('express');
const router = require('../routes/agendamentos');
const FormatoInvalido = require('../errors/FormatoInvalido');
const FormatosValidos = require('../Serializar').FormatosValidos;


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
    app.use('/api/agendamentos', router);

    return app;
};