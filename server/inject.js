JSReload = {
	socket:null,
	reload_page: function() {
		window.location.reload();
	},
	load_page: function(url) {
		window.location = url;
	},
	reload_css: function(path) {
		var links = window.document.getElementsByTagName('link');
		var pat = new RegExp(path, "gi");
		var done = 0;
		var ts = new Date().getTime();
		for (var i = 0; i < links.length; i++) {
			var it = links[i];
			var css = it.href;
			if (it.rel == 'stylesheet' && css.match(pat)) {
				if (css.match(/\?/) == null) css += "?" + ts;
				else css = css.replace(/\?.*$/g, "?" + ts);

				it.href = css;
				done++;
			}
		}

		if (done == 0) {
			this.reload_page();
		}
	},
	is_running: function() {
		return true;
		/*
		var v = document.body.getAttribute("data-jsreload");
		if (v == "on") return true;
		else return false;
		*/
	},
	connect: function() {
		var self = this;
		this.socket = io.connect('http://localhost:8000');
		this.socket.on('news', function (data) {
			var url = data.replace("localhost", location.hostname);

			if (self.is_running()) {
				if (url == "reload") {
					self.reload_page();
				}
				else {
					self.load_page(url);
				}
			}
		});
	}
};

JSReload.connect();
