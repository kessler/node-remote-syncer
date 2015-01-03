require('darkmagic').inject(main)

function main(watch, config, rimraf, ncp, nssocket, fs, rebase, runSync) {
	var lockedFiles = []

	var server = nssocket.createServer(function(connection) {
		connection.data(['ping'], function() {
			console.log('client ping')
			connection.send(['ping'])
		})

		connection.data(['overwrite'], function (file) {		
			console.log('client overwrite')

			overwrite(rebase(config.remoteSource, config.source, file))
		})
	})

	server.listen(config.serverPort, function(err) {
		console.log('server listening on 9191')
	})

	function overwrite(sourceFile) {

		if (lockedFiles.indexOf(sourceFile) > -1) {
			console.log('%s already processing', sourceFile)
			return 	
		}

		lockedFiles.push(sourceFile)
		
		var targetFile = rebase(config.source, config.target, sourceFile)

		console.log('removing %s', targetFile)

		rimraf(targetFile, function (err) {
			if (err) {

				console.log('rmrf error: %s', err)
				
				unlockFile(sourceFile)

				if (err.code !== 'ENOENT' && err.code !== 'EBUSY') {
					return
				}
			} 

			console.log('copying %s -> %s', sourceFile, targetFile)

			ncp(sourceFile, targetFile, function (err) {
				unlockFile(sourceFile)
				
				if (err) {
					console.log('copy error: %s', err)
					return 
				}

				console.log('copied %s to %s successfully', sourceFile, targetFile)
			})
		})

		function unlockFile(file) {

			for (var i = lockedFiles.length - 1; i >= 0; i--) {
				if (lockedFiles[i] === file) {
					console.log('unlocking %s', file)
					lockedFiles.splice(i, 1)
					return
				}
			}

			throw new Error('could not unlock ' + file)
		}
	}	
}