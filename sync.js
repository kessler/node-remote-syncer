var sinker = require('sinker')
var config = require('./config.js')
var sniffer = require('emitter-sniffer')

var sourceSink = sinker(config.source, { write: false, watch: false })
sourceSink.on('ops', print('source: '))
sourceSink.on('sync', print('source: '))
sourceSink.on('stream', print('source: '))

var targetSink = sinker(config.target, {watch: false})
targetSink.on('ops', print('target: '))
targetSink.on('sync', print('target: '))
targetSink.on('stream', print('target: '))

sourceSink.pipe(targetSink).pipe(sourceSink)

function print(label) {
	return function() {
		console.log(label, arguments)
	}
}