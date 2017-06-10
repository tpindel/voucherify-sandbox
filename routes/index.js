var express = require('express');
var router = express.Router();
var leitz = require('leitzicon');
var fs = require('fs');
var webshot = require('webshot');
var querystring = require('querystring');

/* GET home page. */

router.get('/', function(req, res) {
	res.render('index', { title: 'Express' });
});

router.get('/label', function(req, res) {
	res.render('label', { name: req.query.name, uuid: req.query.uuid, qr_id: querystring.escape(req.query.qr_id) });
});

router.post('/print-label/:code', function(req, res) {
	var voucher_code 	= req.params.code;
	var customer_name 	= (req.body.customer || {}).name;
	var qr_id 			= ((req.body.voucher || {}).qr || {}).id;

	var options = {
		shotSize: {
    		width: 1000,
    		height: 400
  		}
	};

	if (!voucher_code || !customer_name || !qr_id) {
		console.error("[print-label] Input params undefined Voucher Code: %s Customer: %s QR: %s", voucher_code, customer_name, qr_id);
		return res.status(400).send('Bad Request');
	}

	var renderStream = webshot('http://127.0.0.1:9000/label?' + "name=" + customer_name + "&uuid=" + voucher_code + "&qr_id=" + querystring.escape(qr_id), options);
	var writeStream = fs.createWriteStream('file.png', {encoding: 'binary'});

	renderStream.on('data', function(data) {
  		writeStream.write(data.toString('binary'), 'binary');
	});

	renderStream.on('end', function() {
		leitz.printPNG(__dirname + '/./../file.png', 'http://192.168.1.35:631/ipp/print', {}, function (err) {
    		if(err) {
    			console.log(err);
    			return res.status(500).send(err);
    		} 

    		res.status(200).send('Printed');
		});
	});
	
});

module.exports = router;
