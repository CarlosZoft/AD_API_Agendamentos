class CampoQtdMinima extends Error{

    constructor(campo) {
        const mensage = `O campo ${campo} tem que ter no mínimo 8 caracteres!`;
        super(mensage);
        this.name = 'CampoQtdMinima'
        this.idError = 2;
    }
    
}

module.exports = CampoQtdMinima;