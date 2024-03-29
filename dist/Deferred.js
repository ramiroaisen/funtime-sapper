'use strict';

require('child_process');
var net = require('net');

let promise;

function weird() {
	if (!promise) {
		promise = get_weird(9000);
	}
	return promise;
}

function get_weird(port) {
	return new Promise(fulfil => {
		const server = net.createServer();

		server.unref();

		server.on('error', () => {
			fulfil(get_weird(port + 1));
		});

		server.listen({ port }, () => {
			const server2 = net.createServer();

			server2.unref();

			server2.on('error', () => {
				server.close(() => {
					fulfil(false);
				});
			});

			server2.listen({ port }, () => {
				server2.close(() => {
					server.close(() => {
						fulfil(true);
					});
				});
			});
		});
	});
}

function check(port) {
	return weird().then(weird => {
		if (weird) {
			return check_weird(port);
		}

		return new Promise(fulfil => {
			const server = net.createServer();

			server.unref();

			server.on('error', () => {
				fulfil(false);
			});

			server.listen({ port }, () => {
				server.close(() => {
					fulfil(true);
				});
			});
		});
	});
}

function check_weird(port) {
	return new Promise(fulfil => {
		const client = net.createConnection({ port }, () => {
				client.end();
				fulfil(false);
			})
			.on('error', () => {
				fulfil(true);
			});
	});
}

function find(port) {
	return weird().then(weird => {
		if (weird) {
			return new Promise(fulfil => {
				get_port_weird(port, fulfil);
			});
		}
		return new Promise(fulfil => {
			get_port(port, fulfil);
		});
	});
}

function get_port(port, cb) {
	const server = net.createServer();

	server.unref();

	server.on('error', () => {
		get_port(port + 1, cb);
	});

	server.listen({ port }, () => {
		server.close(() => {
			cb(port);
		});
	});
}

function get_port_weird(port, cb) {
	const client = net.createConnection({ port }, () => {
			client.end();
			get_port(port + 1, cb);
		})
		.on('error', () => {
			cb(port);
		});
}

function wait(port, { timeout = 5000 } = {}) {
	return new Promise((fulfil, reject) => {
		const t = setTimeout(() => {
			reject(new Error(`timed out waiting for connection`));
		}, timeout);

		get_connection(port, () => {
			clearTimeout(t);
			fulfil();
		});
	});
}

function get_connection(port, cb) {
	let timeout;

	const socket = net.connect(port, 'localhost', () => {
		cb();
		socket.destroy();
		clearTimeout(timeout);
	});

	socket.on('error', () => {
		clearTimeout(timeout);
		setTimeout(() => {
			get_connection(port, cb);
		}, 10);
	});

	timeout = setTimeout(() => {
		socket.destroy();
	}, 5000);
}

class Deferred {
    constructor() {
        this.promise = new Promise((fulfil, reject) => {
            this.fulfil = fulfil;
            this.reject = reject;
        });
    }
}

exports.Deferred = Deferred;
exports.check = check;
exports.find = find;
exports.wait = wait;
//# sourceMappingURL=Deferred.js.map
