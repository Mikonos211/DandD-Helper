const express = require('express');
const path = require('path');  
const bodyParser = require('body-parser');

const app = express();
const Zdolnosc = require('./DbModels');
const { error } = require('console');
const { Sequelize, where } = require('sequelize');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

app.get('/', async (req, res) => {
  const zdolnosc = await Zdolnosc.findAll();
  res.render('main', { zdolnosc , koszt: "" }); 
});

app.get('/search', async (req, res) => {
  const { koszt , wymagania} = req.query;
    console.log(koszt)

    try{
        if(koszt != 0 || koszt ==='' ){
          if(wymagania){
            const zdolnosc = await Zdolnosc.findAll({where: {koszt: koszt}})
             return res.render('main', {zdolnosc, koszt})
          } else {
            const zdolnosc = await Zdolnosc.findAll({where: {koszt: koszt ,
              wymagania: {
                [Sequelize.Op.is]: null 
            }
            }})
            return res.render('main', {zdolnosc, koszt})
          }
        }else{
            const zdolnosc = await Zdolnosc.findAll();
            res.render('main', {zdolnosc, koszt})
        }
         
    }catch(error){
        console.error("Błąd podczas wyszukiwania:", error);
        res.send("Wystąpił błąd podczas wyszukiwania.");
    }
  });

app.listen(3000, () => {
  console.log('Listening to port 3000');
});



