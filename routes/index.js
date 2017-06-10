var express = require('express');
var router = express.Router();
var leitz = require('leitzicon');
var fs = require('fs');
var webshot = require('webshot');

/* GET home page. */

router.get('/', function(req, res) {
	res.render('index', { title: 'Express' });
});

router.get('/label', function(req, res) {
	res.render('label', { name: 'Tomasz Pindel', uuid: "7bb1a7cb-de2d-4954-b624-1e9678569ee1", qr: "http://127.0.0.1:9000/img/qr.png" });
});

router.get('/print-label', function(req, res) {
	var options = {
		shotSize: {
    		width: 1000,
    		height: 400
  		}
	};

	var renderStream = webshot('http://127.0.0.1:9000/label', options);
	var writeStream = fs.createWriteStream('file.png', {encoding: 'binary'});

	renderStream.on('data', function(data) {
  		writeStream.write(data.toString('binary'), 'binary');
	});

	renderStream.on('end', function() {
		console.log('OK');
		leitz.printPNG(__dirname + '/./../file.png', 'http://192.168.1.1:631/ipp/print', {}, function (err) {
    		if(err) {
    			console.log(err);
    			res.send('Error');
    		} 

    		res.send('Printed');
		});
	});
	
});

module.exports = router;
