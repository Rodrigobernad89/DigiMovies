const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize,DataTypes) => {
   const Genre = sequelize.define('Genre', {
        name:DataTypes.STRING,
        ranking:DataTypes.INTEGER,
        active:DataTypes.INTEGER,
    });

    Genre.associate = (models =>{
        Genre.hasMany(models.Movie,{
            as:'movies'            
        })
    })
    return Genre;
}