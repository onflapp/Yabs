function YabsExtension() {
	var self = this;

	self.running = false;
	kango.ui.browserButton.setBadgeValue("off");
	kango.ui.browserButton.setBadgeBackgroundColor([255, 255, 0, 0]);
	kango.ui.browserButton.addEventListener(kango.ui.browserButton.event.COMMAND, function () {
		self._onCommand();
	});

	kango.addMessageListener("c2b", function (event) {
		// event.data - point to data attached
		// event.target - point to the KangoBrowseTab object that sent the message
		self._postStatus();
	});
}

YabsExtension.prototype = {
	_onCommand: function () {
		if (this.running) {
			kango.ui.browserButton.setBadgeBackgroundColor([255, 255, 0, 0]);
			kango.ui.browserButton.setBadgeValue("off");
			this.running = false;

			this._postStatus();
		} else {
			kango.ui.browserButton.setBadgeBackgroundColor([255, 0, 255, 0]);
			kango.ui.browserButton.setBadgeValue("on");
			this.running = true;

			this._postStatus();
		}
	},
	_postStatus: function () {
		var self = this;
		kango.browser.tabs.getCurrent(function (tab) {
			tab.dispatchMessage("b2c", {
				"running": self.running
			});
		});
	}
};

var extension = new YabsExtension();
