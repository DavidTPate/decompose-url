var Benchmark = require('benchmark'),
    benchmarks = require('beautify-benchmark'),
    decomposeUrl = require('..'),
    parseUrl = require('parseurl'),
    nativeUrl = require('url'),
    fastUrlParser = require('fast-url-parser'),
    suite = new Benchmark.Suite,
    testUrl = 'one/two/three?value=abc&value2=123#david-rules';

var urls = [
    'http://username:password@test.example.com:8000/one/two/three?value=abc&value2=123#david-rules',
    'http://username:password@test.example.com:8000/one/two/three#david-rules',
    'http://username:password@test.example.com:8000/one/two/three?value=abc&value2=123',
    'http://test.example.com:8000/one/two/three?value=abc&value2=123#david-rules',
    'http://test.example.com:8000/one/two/three#david-rules',
    'http://test.example.com:8000/one/two/three?value=abc&value2=123',
    'http://test.example.com/one/two/three?value=abc&value2=123#david-rules',
    'http://test.example.com/one/two/three#david-rules',
    'http://test.example.com/one/two/three?value=abc&value2=123',
    '//test.example.com/one/two/three?value=abc&value2=123#david-rules',
    '//test.example.com/one/two/three#david-rules',
    '//test.example.com/one/two/three?value=abc&value2=123',
    '/one/two/three?value=abc&value2=123#david-rules',
    '/one/two/three?value=abc&value2=123',
    '/one/two/three#david-rules',
    'one/two/three?value=abc&value2=123#david-rules',
    'one/two/three?value=abc&value2=123',
    'one/two/three#david-rules',
    'one/two/three'
];

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