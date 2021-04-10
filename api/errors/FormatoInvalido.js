class FormatoInvalido extends Error {
    constructor(contentType){
        const mensage  = `O tipo ${contentType} é invalido! A API aceita soment JSON`
        super(mensage);
        this.name = 'FormatoInvalido';
        this.idError = 6;
    }
}

module.exports = FormatoInvalido;