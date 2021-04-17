const crypto = require ('crypto');
const jwt = require('jsonwebtoken');

function criarToken(usuario){
    const payload = {
        id: usuario.id
    };
    return jwt.sign(payload, process.env.JWT_KEY, {expiresIn: '1d'});
}

module.exports = criarToken
