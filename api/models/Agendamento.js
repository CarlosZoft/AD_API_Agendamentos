const Sequelize = require('sequelize');
const connection = require('../db');

const columns = {
    nome_cliente: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nome_servico: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM("agendado", "cancelado")
    },
    data_agendamento: {
        type: Sequelize.DATE,
        allowNull: false
    }
}
const sequelizeOptions = {
    freezeTableName : true,
    tableName: "agendamento",
    timestamps: true,
    createAt: 'data_criacao',
    updateAt: 'data_atualizacao'
}

module.exports = connection.define('agendamento', columns, sequelizeOptions);