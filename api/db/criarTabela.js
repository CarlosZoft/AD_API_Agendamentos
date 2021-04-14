const ModelAgendamento = require("../models/agendamentos/Agendamento");
const ModelUsuario = require("../models/usuarios/modelTabelaUsuario");

ModelAgendamento.sync()
    .then(() => {
        console.log("Tabela Criada!");
    })
    .catch(() => {
        console.log('Erro, tabela não criada');
    })

ModelUsuario.sync()
    .then(() => {
        console.log("Tabela Criada!");
    })
    .catch(() => {
        console.log('Erro, tabela não criada');
    })