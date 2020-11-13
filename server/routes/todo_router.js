
const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    console.log("in get");
    let queryText = `SELECT * FROM "to_do" ORDER BY "id"`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error)=>{
        console.log("error with get request", error);
        res.sendStatus(500);
    });
});

router.post('/', (req, res)=>{
    console.log('checking on you', req.body);
    let queryText = `INSERT INTO "to_do" ("list_item")
    VALUES ($1);`;
    pool.query(queryText, [req.body.item])
    .then((result)=>{
        console.log('back from POST pg,', result.rows);
        res.sendStatus(200);
    }).catch((err)=>{
        console.log('error in POST pg', err);
        res.sendStatus(500);
    })
});

router.put('/:id', function(req, res) {
    pool.query(`
      UPDATE "to_do"
      SET "yesComplete" = $1
      WHERE "id" = $2;
    `, [
      req.body.yesComplete,      // $1
      req.params.id             // $2
    ]).then(function (results) {
      res.send(results.rows);
    }).catch(function (err) {
      console.log(err);
      res.sendStatus(500);
    });
  })

  router.delete('/:id', (req, res) => {
    console.log('req params', req.params);
    let queryText = `DELETE FROM "to_do" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id]).then((result) => {
        console.log(result);
        res.sendStatus(200);
    }).catch((error) => {
        console.log('error in post', error);
        res.sendStatus(500);
    });
});

module.exports = router;