const { DataTypes } = require('sequelize');
const sequelize = require('./db'); 

const Zdolnosc = sequelize.define('Zdolnosc', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nazwa: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    wymagania: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    koszt: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    opis: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    tableName: 'Zdolnosc',
    timestamps: false
});

module.exports = Zdolnosc; 
