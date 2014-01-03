var express = require('express');
var logfmt = require('logfmt');
var app = express();

app.use(logfmt.requestLogger());

app.get('/', function(req, res) {

	res.type('text/plain');
	res.send('Welcome To Topplers');
});

app.get('/topplers/test', function(req, res) {

	var json_test = {"this":"is", "a":"test"};

	res.json(json_test);
});

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