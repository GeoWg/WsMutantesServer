const express = require('express');
const router = express.Router();

router.post('/', function(req, res, next) {
    var users = res.locals.connection.query('SELECT * FROM users where user = ? and password = ?', [req.body.user, req.body.password], function(error, results, fields) {
        if (error) {
            res.send(JSON.stringify({
                "status": 500,
                "error": error,
                "response": null
            }));
        } else {
            if (results.length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify({
                    "status": 200,
                    "response": results[0]
                }));
            } else
                res.send(JSON.stringify({
                    "nome": "",
                    "status": 401
                }))
        }
    })
});

module.exports = router;