const Sequelize = require('sequelize');
const connection = require('../../db');


const Usuario = connection.define('usuario',
    {

        usuario :{
            type: Sequelize.STRING,
            allowNull: false
        },
        email :{
            type: Sequelize.STRING,
            allowNull: false
        },
        senha :{
            type: Sequelize.STRING,
            allowNull: false
        }
    
    },
    {
        freezeTableName: true,
        tableName: 'usuario',
        timestamps:true,
        createAt: 'data_criacao',
        updateAt: 'data_atualizacao'
    }
)
module.exports = Usuario;