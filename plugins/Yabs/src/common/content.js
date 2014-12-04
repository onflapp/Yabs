// ==UserScript==
// @name Test
// @include http://*
// @include file://*
// ==/UserScript==

if (self == top && document.getElementById("jabs-content") == null) {
	var s = document.createElement("script");
	s.src = "http://localhost:8000/socket.io/socket.io.js";
	s.onload = function() {
		var s = document.createElement("script");
		s.src = "http://localhost:8000/inject.js";
		document.head.appendChild(s);
	};
	document.head.appendChild(s);

	document.body.setAttribute("data-jsreload", "on");

	kango.addMessageListener("b2c", function(event) {
		// event.data - the data sent with message
		if (event.data.running) {
			document.body.setAttribute("data-jsreload", "on");
		}
		else {
			document.body.setAttribute("data-jsreload", "off");
		}
	});

	kango.dispatchMessage("c2b", "hello");
}
