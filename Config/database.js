const {Sequelize}= require('sequelize') ; 

const sequelize = new Sequelize('Hotel', 'root','',{
    host:'localhost' ,
    dialect:'mysql',
    logging:false
}) ; 


module.exports = sequelize ; 
