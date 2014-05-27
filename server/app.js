var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(8000);

function handler (req, res) {
	if (req.url == "/") {
		fs.readFile(__dirname + '/frame.html',
			function (err, data) {
				if (err) {
					res.writeHead(500);
					return res.end('Error loading frame.html');
				}

				res.writeHead(200);
				res.end(data);
			}
		);
	}
	else if (req.url == "/index.html") {
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
		console.log("URL:" + u);
		io.sockets.emit("news", u);
		res.writeHead(200);
		res.end("done");
	}
}

io.sockets.on('connection', function (socket) {
  socket.on('news', function (data) {
		socket.broadcast.emit('news', data);
  });

});
