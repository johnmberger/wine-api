const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// const indexController = require('../controllers/wines');

// get all wines
router.get('/', (req, res, next) => {

  // Works for one query
  if (Object.keys(req.query).length) {

    var key = Object.keys(req.query)[0];

    db.any(`SELECT * FROM wines WHERE ${key} = '${req.query[key]}'`, [true])
    .then((wine) => {
      if (wine.length) {
        res.send(wine);
      } else {
        res.send({
          status: 'Error',
          message: 'Wine does not exist'
        });
      }
    })
    .catch((error) => {
      next(error);
    });

  } else {
    db.any(`SELECT * FROM wines ORDER BY id`, [true])
      .then((wine) => {
        res.send(wine);
      })
      .catch((error) => {
        next(error);
      });
  }
});

// get one wine
router.get('/:id', (req, res, next) => {

  const wineID = parseInt(req.params.id);

  db.any(`SELECT * FROM wines WHERE id = ${wineID}`, [true])
    .then((wine) => {
      if (wine.length) {
        res.send(wine[0]);
      } else {
        res.status(404).send({
          status: 'Error',
          message: 'That wine does not exist'
        });
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/', function (req, res, next) {

  const newWine = {
    name: req.body.name,
    region: req.body.region,
    year: parseInt(req.body.year),
    price: req.body.price,
    notes: req.body.notes,
    rating: parseInt(req.body.rating)
  };

  db.any(`INSERT INTO wines (name, region, year, price, notes, rating) VALUES ('${newWine.name}', '${newWine.region}', ${newWine.year}, ${newWine.price}, '${newWine.notes}', '${newWine.rating}')`, [true])
    .then(function (wine) {
      res.send({
        message: 'Wine added',
        data: newWine
      });
    })
    .catch(function (error) {
      next(error);
    });
});

router.put('/:id', (req, res, next) => {

  const wineID = parseInt(req.params.id);

  if (Object.keys(req.body).length) {

    var attr = Object.keys(req.body)[0];

    var value;

    if (attr === 'rating' || attr === 'year') {
      value = parseInt(req.body[attr]);
    } else {
      value = req.body[attr];
    }

    db.any(`UPDATE wines SET ${attr} = ${value} WHERE id = ${wineID}`, [true])
    .then((data) => {
      res.send({
        status: 'Success',
        message: 'Wine updated!'
      });
    })
    .catch((error) => {
      next(error);
    });
  }
});

router.delete('/:id', (req, res, next) => {

  const wineID = parseInt(req.params.id);

  db.any(`DELETE FROM wines WHERE id = ${wineID}`, [true])
  .then((data) => {
    res.send({
      status: 'Success',
      message: 'Wine deleted!'
    });
  })
  .catch((error) => {
    next(error);
  });
});

module.exports = router;
