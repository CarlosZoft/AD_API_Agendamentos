const ModelAgendamento = require("../models/agendamentos/Agendamento");
const ModelUsuario = require("../models/usuarios/modelTabelaUsuario");

ModelAgendamento.sync()
    .then(() => {
        console.log("Tabela Criada!");
    })
    .catch((errr) => {
        console.log(errr);
    })

ModelUsuario.sync()
    .then(() => {
        console.log("Tabela Criada!");
    })
    .catch((erro) => {
        console.log(erro);
    })
