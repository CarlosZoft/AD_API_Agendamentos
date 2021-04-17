const criarToken = require('../../shared/gerarToken');

module.exports = {
    login : (req,res) => {
        const acessToken = criarToken(req.user);
        res.set('Authorization', acessToken);
        res.status(200).send();
    }
}