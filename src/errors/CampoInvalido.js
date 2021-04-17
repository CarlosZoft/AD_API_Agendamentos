class CampoInvalido extends Error {

    constructor(campo){
        const mensage = `O campo ${campo} está inválido`;
        super(mensage);
        this.name = 'CampoInvalido';
        this.idError = 1; 
    }

}

module.exports = CampoInvalido;