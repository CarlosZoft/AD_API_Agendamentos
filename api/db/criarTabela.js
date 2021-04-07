const ModelAgendamento = require("../models/Agendamento");

ModelAgendamento.sync()
    .then(() => {
        console.log("Tabela Criada!");
    })
    .catch(() => {
        console.log('Erro, tabela não criada');
    })