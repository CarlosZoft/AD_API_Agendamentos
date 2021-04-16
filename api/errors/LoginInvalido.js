class LoginInvalido extends Error{
    constructor(){
        super("e-mail ou senha inválidos");
        this.name = 'LoginInvalido';
        this.IdError = 7;
   }
}

module.exports = LoginInvalido;