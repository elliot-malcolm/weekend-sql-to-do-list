
const express = require('express');
const router = express.Router();
// const pool = require('../modules/pool');

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
    let toDoItem = req.body;
    let queryText = `INSERT INTO "to_do" ("list_item")
    VALUES($1);`;
    pool.query(queryText, [toDoItem.listItem])
    .then((result)=>{
        console.log('back from POST pg,', result.rows);
        res.sendStatus(200);
    }).catch((err)=>{
        console.log('error in POST pg', err);
        res.sendStatus(500);
    })
});

module.exports = router;