
const express = require('express');
const router = express.Router();
// const pool = require('../modules/pool');

router.get('/', (req, res) => {
    console.log("in get");
    res.sendStatus(200)
});
    // let queryText = `SELECT * FROM "songs" ORDER BY "id"`;
    // pool.query(queryText).then((result) => {
    //     res.send(result.rows);
    // }).catch((error)=>{
    //     console.log("error with get request", error);
    //     res.sendStatus(500);
    // });
// });

module.exports = router;