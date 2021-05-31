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
    res.status(status).json({ status })
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

  console.log("logout");
  res.status(201).send("hej");


});

router.post('/zapiszSie', async (req, res) => {

  const mongo = await load('user-tournament');
  try {
    await mongo.insertOne({
      user: req.body[1],
      tournament: req.body[0]
    });
    res.status(201).send("Git");
  }
  catch (err) {
    const status = 401
    res.status(status).json({ message })
  }



});

router.post('/mytour', async (req, res) => {
  const mongo = await load('tournaments');
  const mongo2 = await load('user-tournament');

  try {
    var x = [];
    x = await mongo.find({ user: req.body[0] }).toArray();


    var y = [];
    for (var i = 0; i < x.length; i++) {
      if (x[i]._id) {
        y = await mongo2.find({ tournament: x[i]._id.toString() }).toArray();
        if (y.length != 0) x.push(y);
      }
    }
    res.send(x);
  }
  catch (err) {
    console.log(err);
    const status = 404
    res.status(status).send("Bad");
  }

});

router.post('/getTournaments', async (req, res) => {
  const mongo = await load('tournaments');
  try {
    var x = await mongo.find({}).toArray();
    res.send(x);
  }
  catch (err) {
    const status = 404
    res.status(status).send("Bad");
  }

});

router.post('/editTournament', async (req, res) => {

  const mongo = await load('tournaments');

  try {
    var o_id = new mongodb.ObjectID(req.body._id);
    const filter = {'_id': o_id};
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        game: req.body.game,
        title: req.body.title,
        prize: req.body.prize,
        date: req.body.date,
        time: req.body.time,
        street: req.body.street,
        city: req.body.city,
        user: req.body.user,
        link: req.body.link
      },
    };
    const result = await mongo.updateOne(filter, updateDoc, options);
    res.status(201).send("Git");
  }
  catch (err) {
    console.log(err);
    const status = 404
    res.status(status).send("Bad");
  }

});

router.post('/czyZapisano', async (req, res) => {
  const mongo = await load('user-tournament');
  var y = await mongo.find({ user: req.body[1], tournament: req.body[0] }).toArray();
  console.log(y);
  if (y.length > 0) res.status(201).send("Git");
  else res.status(401).send("Bad");

});


router.post('/showDetails', async (req, res) => {
  const mongo = await load('tournaments');
  const mongo2 = await load('user-tournament');


  try {
    var o_id = new mongodb.ObjectID(req.body[0]);
    var x = await mongo.find({ '_id': o_id }).toArray();
    var y = await mongo2.find({ user: req.body[1], tournament: req.body[0] }).toArray();
    x.push(y);
    res.send(x);
  }
  catch (err) {
    const status = 401
    res.status(status).send("Bad");
  }
});

router.post('/getUser', async (req, res) => {
  const mongo = await load('user');
  try {
    var x = await mongo.find({ login: req.body[0] }).toArray();
    res.send(x);
  }
  catch (err) {
    const status = 401
    res.status(status).send("Bad");
  }

});

router.post('/pushTournament', async (req, res) => {

  var link = "";
  const mongo = await load('tournaments'); // polaczenie z baza danych a konkretnie kolekcją
  if (req.body.Chosen == "League Of Legends") link = 'https://i.pinimg.com/474x/16/51/ec/1651eccc4e4a518df1382241b3a7610f.jpg';
  if (req.body.Chosen == "Dota 2") link = 'https://www.gry-online.pl/galeria/gry13/506128520d.jpg';
  if (req.body.Chosen == "Smite") link = 'https://alternative.me/media/256/smite-icon-3yl1e87n7tmaqh0v-c.png';
  if (req.body.Chosen == "CS GO") link = 'https://steamuserimages-a.akamaihd.net/ugc/920288714608362510/CB23A353333E40D05DEFFEF269B16415CC5D722B/';


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