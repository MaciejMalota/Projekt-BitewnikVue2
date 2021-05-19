const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
// Get Posts
router.get('/', async (req, res) => {
  const posts = await loadPostsCollection();
  res.send(await posts.find({}).toArray());
});

// Add Post
router.post('/', async (req, res) => {

  const posts = await loadPostsCollection();
  const crypto = require('crypto')
  var errors = [];
  const md5sum = crypto.createHash('md5');

  const pas = md5sum.update(req.body.haslo).digest('hex');

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