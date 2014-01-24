var express = require('express');
var logfmt = require('logfmt');
var app = express();
var https = require('https');

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {

	res.type('text/html');

	var the_page = '<html><head><title>Topplers Test Node App</title></head><body><h2>Welcome To Topplers</h2>';
	
	the_page += '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">';
	the_page += '<input type="hidden" name="cmd" value="_s-xclick">';
	the_page += '<input type="hidden" name="hosted_button_id" value="UCXW9MR7EPBGQ">';
	the_page += '<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_paynow_SM.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!">';
	the_page += '<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">';
	the_page += '</form></body></html>';

	res.send(the_page);

	res.end();
});

app.get('/topplers/test', function(req, res) {

	//console.log(req);

	var json_test = {"this":"is", "a":"test"};

	res.json(json_test);
});

app.post('/paypal/ipn', function(req, res) {

	console.log(req);

	res.send(200);
});

app.post('/orders/new', function(req, res) {

	console.log(req);

	var json_test = {"this":"is", "a":"test"};

	res.json(json_test);
});

app.get('/topplers/orders', function(req, res) {

	console.log(req);

	res.type('text/plain');
	res.send("thanks, done");

	var options = {
		hostname: 'topplers-dev-shop.myshopify.com',
		port: 443,
		path: '/admin/orders.json',
		method: 'GET',
		auth: '0c7d701cf12b04bfc9db01cc2f9111ee:9288007fd4c55695fe95d4c07229e863'
	};


	var req = https.request(options, function(response) {

		//console.log('status = ', response.statusCode);
		//console.log('headers = ', response.headers);

		response.on('data', function(d) {

			process.stdout.write(d);
			//process.stdout.write('\n------\n');
			//process.stdout.write(d.orders);
			//res.send(d);
			//console.log(d);

			//displayOrders(d);
		});

	});

	req.end();

	req.on('error', function(e) {

		console.error(e);
	});

	console.log("orders remote request done");
});

function displayOrders(orders) {

	console.log("Found " + orders.length + " orders returned from shopify")
}

/*
function by_name(a, b) {
	if (a.name < b.name)
		return -1;
	if (a.name > b.name)
		return 1;
	return 0;
}

app.get('/causes/select2', function(req, res) {

	var matches = [];
	var term = req.param('q');

	var term_re = new RegExp(term, 'gi');

	//var arr = $.grep(causes, function(term) {
	//	return causes.name.match(new RegExp(term, 'g'));
	//});

	// This would be replaced with a database query...
	for (var i=0; i < causes.length; i++) {

		if (causes[i].name.match(term_re)) {
			matches.push(causes[i]);
		}

	}
	// end database query...

	var obj = {total: matches.length, term: term, causes: matches.sort(by_name) };

	res.jsonp(obj);
});

app.get('/causes/jsonp', function(req, res) {

	res.jsonp(causes);
});

// NOTE - This needs to be *before* /cause/:id or else "random" would
// be treated as an 'id'...routes are processed in order they are defined

app.get('/cause/random', function(req, res) {

	var id = Math.floor(Math.random() * causes.length);
	var c = causes[id];

	res.json(c);
});

app.get('/cause/:id', function(req, res) {

	if (causes.length <= req.params.id || req.params.id < 0) {
		res.statusCode = 404;
		return res.send('Error 404: No cause found with id = ' + req.params.id);
	}

	var c = causes[req.params.id];
	res.json(c);
});
*/

var port = process.env.PORT || 4777;

app.listen(port, function() {
	console.log("Listening on " + port);
});