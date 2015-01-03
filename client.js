require('darkmagic').inject(main)

function main(nssocket, config, watch) {

	var client = new nssocket.NsSocket({ reconnect: true })

	client.connect(config.serverPort, config.vmAddress)
	
	client.on('start', function () {
		client.send(['ping'])	
	})
	
	client.data(['ping'], function () {
		console.log('server ping')
	})

	client.on('error', function(err) {	
		console.log(err) 
	})

	watch.createMonitor(config.remoteSource, function (monitor) {
		console.log('monitoring %s', config.remoteSource)

		monitor.on('created', overwrite)

		monitor.on('changed', overwrite)

		monitor.on('removed', overwrite)
	})

	function overwrite(file) {
		console.log('overwritting %s', file)
		client.send(['overwrite'], file)
	}
}