const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const JWT = require('jsonwebtoken');
const crypto = require('crypto');
var app = express();
var cors = require('cors');
app.use(cors());

const SECRET = 'cisza';
// Get Posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Add Post
router.post('/register', async (req, res) => {
  var errors = [];
  const posts = await loadPostsCollection(); // laduje posty czyli dane 

  
  const md5sum = crypto.createHash('md5');
  const pas = md5sum.update(req.body.haslo).digest('hex'); // hashowanie hasla 

  if (await posts.findOne({ email: req.body.email })) {
    errors.push("Email w użyciu");
  }

  if (await posts.findOne({ login: req.body.login })) {
    errors.push("Login w użyciu");
  }

  if( errors.length != 0 ){
    return res.status(404).send({message: errors})
  }

  await posts.insertOne({
    imie: req.body.imie,
    nazwisko: req.body.nazwisko,
    login: req.body.login,
    data: req.body.data,
    email: req.body.email,
    haslo: pas,
    miasto: req.body.miasto
  });


  res.status(201).send('Stworzono');
  
});

router.post('/login', async (req, res) => {

  var errors = [];
  const posts = await loadPostsCollection();
  
  const md5sum = crypto.createHash('md5');

  const pas = md5sum.update(req.body.haslo).digest('hex');

  if (await posts.findOne({ login: req.body.login })) {

    var user = await posts.findOne({ login: req.body.login });
    if(user.haslo == pas){

      console.log('Zalogowano');

    }
    else{
      errors.push("Błędne Hasło");
    }

  }else{
    errors.push("Nie znaleziono użytkownika");
  }


  if( errors.length != 0 ){
    return res.status(404).send({message: errors})
  }
  const payload = {
      login: req.body.login
  }

  const token = JWT.sign(payload, SECRET);
  res.cookie('access_token', token,{
    maxAge: 3600,
    httpOnly: true
  });
  
  res.status(200).send({ login: req.body.login, jwt: token });
});

async function loadPostsCollection() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://lasek:lasek123@cluster0.8f7wo.mongodb.net/test',
    {
      useNewUrlParser: true
    }
  );

  return client.db('bitewnik').collection('user');
}

module.exports = router;