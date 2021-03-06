var Benchmark = require('benchmark'),
    benchmarks = require('beautify-benchmark'),
    decomposeUrl = require('..'),
    parseUrl = require('parseurl'),
    nativeUrl = require('url'),
    fastUrlParser = require('fast-url-parser'),
    suite = new Benchmark.Suite,
    testUrl = 'http://username:password@test.example.com:8000/one/two/three?value=abc&value2=123#david-rules';

suite.add({
    name: 'decomposeUrl',
    minSamples: 100,
    fn: function () {
        decomposeUrl(testUrl);
    }
}).add({
    name: 'nativeUrl',
    minSamples: 100,
    fn: function () {
        nativeUrl.parse(testUrl, true);
    }
}).add({
    name: 'parseUrl',
    minSamples: 100,
    fn: function () {
        parseUrl({ url: testUrl });
    }
}).add({
    name: 'fastUrlParser',
    minSamples: 100,
    fn: function () {
        fastUrlParser.parse(testUrl, true);
    }
}).on('start', function onCycle() {
    process.stdout.write('  Parsing URL ' + testUrl + '\n\n')
}).on('cycle', function onCycle(event) {
    benchmarks.add(event.target);
}).on('complete', function onComplete() {
    benchmarks.log();
}).run();