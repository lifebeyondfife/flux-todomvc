var rp = require('request-promise');
var TodoConfig = require('../constants/TodoConfig');

var apiOptions = function() {
	return {
		uri: 'http://' + TodoConfig.HOST + ':' + TodoConfig.PORT + TodoConfig.PATH,
		json: true
	};
};

var HttpRequests = {
	post: function(callback, id, text) {
		this._requestWithBody(callback, id, text, false, 'POST');
	},

	put: function(callback, id, text, complete) {
		this._requestWithBody(callback, id, text, complete, 'PUT');
	},

	_requestWithBody: function(callback, id, text, complete, method) {
		var options = apiOptions();
		options.method = method;
		options.uri += '/' + id;
		options.body = {text: text, id: id, complete: complete};

		console.log(options);

		rp(options).
			then(function(parsedBody) {
				callback(parsedBody);
			}).
			catch(function(err) {
				console.log('Error sending todo "' + id + '".');
				console.log(err);
			});
	},

	get: function(callback) {
		var options = apiOptions();
		options.method = 'GET';

		rp(options).
			then(function(parsedBody) {
				callback(parsedBody);
			}).
			catch(function(err) {
				console.log('Error getting todos from server.');
			});
	}
};

module.exports = HttpRequests;