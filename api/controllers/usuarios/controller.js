const router = require("express").Router();
const Usuario = require("./Usuario");
const crypto = require ('crypto');
const jwt = require('jsonwebtoken');

function criarToken(usuario){
    const payload = {
        id: usuario.id
    };
    return jwt.sign(payload, 'segredo');
}

module.exports = {
    login : (req,res) => {
        const acessToken = criarToken(req.user);
        res.set('Authorization', acessToken);
        res.status(200).send()
    }
}