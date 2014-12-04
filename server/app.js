var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
	, uparser = require('url');

app.listen(8000);

function handler (req, res) {
	var uopts = uparser.parse(req.url, true)

	if (req.url == "/index.html") {
		fs.readFile(__dirname + '/index.html',
			function (err, data) {
				if (err) {
					res.writeHead(500);
					return res.end('Error loading index.html');
				}

				res.writeHead(200);
				res.end(data);
			}
		);
	}
	else if (req.url == "/inject.js") {
		fs.readFile(__dirname + '/inject.js',
			function (err, data) {
				if (err) {
					res.writeHead(500);
					return res.end('Error loading inject.js');
				}

				res.writeHead(200);
				res.end(data);
			}
		);
	}
	else if (req.url.indexOf("/load") == 0) {
		var u = req.url.match(/u=(.*)/)[1];
		io.sockets.emit("news", u);
		res.writeHead(200);
		res.end("done");
	}
	else {
		fs.readFile(__dirname + '/frame.html',
			{ encoding:'utf8' },
			function (err, data) {
				var iu = uopts.query.u ? uopts.query.u : "about:blank";
				var ndata = data.replace("%%INIT_URL%%", iu);

				if (err) {
					res.writeHead(500);
					return res.end('Error loading frame.html');
				}

				res.setHeader("Access-Control-Allow-Origin", "*");
  			res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
				res.writeHead(200);
				res.end(ndata);
			}
		);
	}
}

io.sockets.on('connection', function (socket) {
  socket.on('news', function (data) {
		socket.broadcast.emit('news', data);
  });
});
