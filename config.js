var rc = require('rc')

module.exports = rc('remote-syncer', {
	target: 'c:\\somewhere',
	source: 'z:\\somewhere',
	remoteSource: '/somewhere',
	vmAddress: '127.0.0.1',
	serverPort: 9191
})