class CampoQtdMaxima extends Error{
    constructor(campo){
        const mensage = `O campo ${campo} ultrapassou a quantidade máxima de 64 caracteres`;
        super(mensage);
        this.name = 'CampoQtdMaxima';
        this.idError = 5;
    }
}

module.exports = CampoQtdMaxima;