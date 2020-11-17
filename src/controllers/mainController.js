const db= require('../database/models');
const{Movie, Genre, Actor} = require('../database/models')
const {Op} = require('sequelize');



module.exports = {
    index:(req,res) =>{
        res.render('bienvenidos');
    }
}