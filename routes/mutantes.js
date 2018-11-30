const express = require('express');
var Buffer = require('buffer').Buffer;
var fs = require('fs');
var path = require('path');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.locals.connection.query('SELECT * from mutantes', function(error, results, fields) {
        if (error) {
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

router.post('/', function(req, res, next) {
    res.locals.connection.query('INSERT INTO mutantes (nome, habilidade, nomeUsuario) VALUES (?, ?, ?)',
        [req.body.nome, req.body.habilidade, req.body.nomeUsuario], function(error, results, fields) {
        if (error) {
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

router.put('/', function(req, res, next){
    res.locals.connection.query('UPDATE mutantes SET nome = ?, habilidade = ?, WHERE nomeUsuario = ?',
     [req.body.nome, req.body.habilidade, req.body.nomeUsuario], function(error, results, fields){
        if (error) {
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            //If there is no error, all is good and response is 200OK.
        }
     });
});

router.delete('/', function(req, res, next){
    res.locals.connection.query('DELETE FROM mutantes WHERE nome = ?',[req.body.nome], function(error, results, fields){
        if (error) {
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            //If there is no error, all is good and response is 200OK.
        }
     });
});

router.get('/nome/:nome', function(req, res, next) {
    res.locals.connection.query('SELECT * from mutantes WHERE nome like "%"?"%"', [req.params.nome],  function(error, results, fields) {
        if (error) {
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

router.get('/habilidade/:habilidade', function(req, res, next) {
    res.locals.connection.query('SELECT * from mutantes WHERE habilidade LIKE "%"?"%"', [req.params.habilidade],  function(error, results, fields) {
        if (error) {
            res.send(JSON.stringify({ "status": 500, "error": error, "response": null }));
            //If there is error, we send the error in the error section with 500 status
        } else {
            res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
            //If there is no error, all is good and response is 200OK.
        }
    });
});

/**
 * @param  {string} filename
 */
function encode_base64(filename) {
    fs.readFile(path.join(__dirname, '/public/', filename), function(error, data) {
      if (error) {
        throw error;
      } else {
        let buf = Buffer.from(data);
        let base64 = buf.toString('base64');
        // console.log('Base64 ' + filename + ': ' + base64);
        return base64;
      }
    });
  }
  /**
   * @param  {string} base64str
   * @param  {string} filename
   */
  function decode_base64(base64str, filename) {
    let buf = Buffer.from(base64str, 'base64');
  
    fs.writeFile('././images/' + filename, buf, function(error) {
      if (error) {
        throw error;
      } else {
        console.log('File created from base64 string!');
        return true;
      }
    });
  }

module.exports = router;