module.exports = 	function () {
	return function rebase(from, to, file) {
		var sourceFile = file.replace(from, to)
		return sourceFile.replace(/\//g, '\\')		
	}
}