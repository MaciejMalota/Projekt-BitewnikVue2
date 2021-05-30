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
  const posts = await load('user');
  res.send(await posts.find({}).toArray());
});

// Add Post
router.post('/register', async (req, res) => {
  var errors = [];
  const posts = await load('user'); // laduje posty czyli dane 


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

async function getstate(log) {  // zwraca stopień uprawnień
  const posts = await load('user');
  var user = await posts.findOne({ login: log });

  if (user) {
    return user.right;

  }
  else {
    return 0;
  }

}

router.get('/getgames', async (req, res, next) => {

  const ga = await load('games');

  var games = await ga.find({}).toArray();

  if (games) {

    const status = 201
    res.status(status).json({ status, games })

  } else {
    const status = 401
    res.status(status).json({ status })

  }

});

router.post('/ver', async (req, res) => {
  var cookie = req.body[0];

  try {
    var c = verifyToken(cookie);
    const status = 201
    const message = c;
    var prawa = await getstate(c.login);
    res.status(status).json({ message, prawa })
  }
  catch (err) {
    const status = 401
    const message = 'Unauthorized'
    res.status(status).json({ message })
  }
});

router.post('/login', async (req, res) => {

  var errors = [];
  const posts = await load('user');

  const md5sum = crypto.createHash('md5');
  const pas = md5sum.update(req.body.haslo).digest('hex');// hashuje hasło i zapisuje do zmiennej

  if (await posts.findOne({ login: req.body.login })) {

    var user = await posts.findOne({ login: req.body.login });
    if (user.haslo != pas) {

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
  res.status(200).send({ jwt: token });
});


router.post('/logout', async (req, res) => {

  res.status(201).send("hej");


});


router.post('/getTournaments', async (req, res) => {
  const mongo = await load('tournaments');
  
  res.send(await mongo.find({}).toArray());

});



router.post('/pushTournament', async (req, res) => {

  var link = "";
  const mongo = await load('tournaments'); // polaczenie z baza danych a konkretnie kolekcją
  if(req.body.Chosen == "League Of Legends") link = 'https://static.wikia.nocookie.net/leagueoflegends/images/9/9a/League_of_Legends_Update_Logo_Concept_05.jpg/revision/latest/scale-to-width-down/250?cb=20191029062637';
  if(req.body.Chosen == "Dota 2") link = 'https://static.antyweb.pl/uploads/2017/04/dota2_1-1420x670.jpg';
  if(req.body.Chosen == "Smite") link = 'https://cdn.dlcompare.com/game_tetiere/upload/gameimage/file/7577.jpeg';
  if(req.body.Chosen == "CS GO") link = 'https://geex.x-kom.pl/wp-content/uploads/2020/10/cs-go-logo.jpg';
  

  await mongo.insertOne({
    game: req.body.Chosen,
    title: req.body.Title,
    prize: req.body.Prize,
    date: req.body.Data,
    time: req.body.Time,
    street: req.body.Street,
    city: req.body.City,
    user: req.body.User,
    link: link
  });

  res.status(201).send('Dodano');

});




async function load(t) {
  const client = await mongodb.MongoClient.connect(
    'mongodb+srv://lasek:lasek123@cluster0.8f7wo.mongodb.net/test',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );

  return client.db('bitewnik').collection(t);
}

module.exports = router;