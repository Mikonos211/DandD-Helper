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
  const { koszt , wymagania , typGry} = req.query;
    console.log(koszt);
    console.log(wymagania);
    console.log(typGry);
    try{
      let warunki = {};
      if(koszt != 0 || koszt ===''){
        warunki.koszt = koszt
      }
      if(!wymagania){

      } else {
        warunki.wymagania = { [Sequelize.Op.not]: null }
      }

      // if(typGry != "Nie Wybrany"){
      //   warunki.typGry = typGry;
      // }

      const zdolnosc = await Zdolnosc.findAll({where : warunki});
      res.render('main', {zdolnosc , koszt, wymagania})
    }catch(error){
        console.error("Błąd podczas wyszukiwania:", error);
        res.send("Wystąpił błąd podczas wyszukiwania.");
    }
  });

app.listen(3000, () => {
  console.log('Listening to port 3000');
});



 