const Usuario = require('./Usuario');
const LoginInvalido = require('../../errors/LoginInvalido');
const NaoEncontrado = require('../../errors/NaoEncontrado');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


function conferirUsuario (usuario) {
    if(!usuario){
        throw new NaoEncontrado('Usuario');
    }
}
async function conferirSenha(senha, senhaHash){
    const senhaCorreta = await bcrypt.compare(senha,senhaHash);
    if(!senhaCorreta){
        throw new LoginInvalido();
    } 
}

module.exports = {
    passport:

    passport.use(
        new LocalStrategy({
            usernameField: "email",
            passwordField: "senha",
            session: false
        },
            async(email, senha, done) => {
                try{
                    const usuario = new Usuario({email:email})
                    await usuario.buscarPorEmail();
                    conferirUsuario(usuario.id);
                    await conferirSenha(senha, usuario.senha);
                    done(null,usuario);
                }
                catch(error){
                    done(error);
                }
            }
        
        )
    )
}