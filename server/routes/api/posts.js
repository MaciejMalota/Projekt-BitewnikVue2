const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
const JWT = require('jsonwebtoken');
const crypto = require('crypto');
var app = express();
var cors = require('cors');
app.use(cors());
router.use(cors());
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

  if (errors.length != 0) {
    return res.status(404).send({ message: errors })
  }

  await posts.insertOne({
    imie: req.body.imie,
    nazwisko: req.body.nazwisko,
    login: req.body.login,
    data: req.body.data,
    email: req.body.email,
    haslo: pas,
    miasto: req.body.miasto,
    right: 0
  });


  res.status(201).send('Stworzono');

});


function verifyToken(token) {
  return JWT.verify(token, SECRET)
}

async function getstate(log) {
  const posts = await loadPostsCollection();
  var user = await posts.findOne({ login: log });

  if (user) {
    return user.right;

  }
  else {
    return 0;
  }

}

router.get('/getgames', async (req, res, next) => {

  const ga = await loadGames();

  var games = await ga.find({}).toArray();

  if (games) {

    const status = 201
    res.status(status).json({ status, games })

  } else {
    const status = 401
    res.status(status).json({ status })

  }

});

router.post('/ver', async (req, res, next) => {
  var cookie = req.body[0];

  try {
    var c = verifyToken(cookie);
    const status = 201
    const message = c;
    var prawa = await getstate(c.login);
    res.status(status).json({ status, message, prawa })
  }
  catch (err) {
    const status = 401
    const message = 'Unauthorized'
    res.status(status).json({ status, message })
  }
});

router.post('/login', async (req, res) => {

  var errors = [];
  const posts = await loadPostsCollection();

  const md5sum = crypto.createHash('md5');
  const pas = md5sum.update(req.body.haslo).digest('hex');

  if (await posts.findOne({ login: req.body.login })) {

    var user = await posts.findOne({ login: req.body.login });
    if (user.haslo == pas) {

      console.log('Zalogowano');

    }
    else {
      errors.push("Błędne Hasło");
    }

  } else {
    errors.push("Nie znaleziono użytkownika");
  }



  if (errors.length != 0) {
    return res.status(404).send({ message: errors })
  }
  const payload = {
    login: req.body.login
  }

  const token = JWT.sign(payload, SECRET);
  res.status(200).send({ login: req.body.login, jwt: token });
});


router.post('/logout', async (req, res) => {

  res.status(201).send("hej");

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

async function loadGames() {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://lasek:lasek123@cluster0.8f7wo.mongodb.net/test',
    {
      useNewUrlParser: true
    }
  );

  return client.db('bitewnik').collection('games');
}

module.exports = router;