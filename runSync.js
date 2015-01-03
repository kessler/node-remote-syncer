module.exports = function (child_process, callback) {
	child_process.exec('node sync.js', function(err, stdout, stderr) {
		if (err) return callback(err)

		console.log('initial sync done')
		callback()
	})
}