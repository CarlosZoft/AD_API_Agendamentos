require('dotenv').config({path:"../../env"})
const Sequelize = require('sequelize');

console.log(process.env.mysql_password, "AQUI",process.env.mysql_database );
const connection = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
     {
         host:process.env.MYSQL_HOST,
         dialect: 'mysql',
         port:process.env.MYSQL_PORT
     }
)

module.exports = connection;