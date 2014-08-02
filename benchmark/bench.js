var Benchmark = require('benchmark'),
    mySuite = new Benchmark.Suite,
    nodeSuite = new Benchmark.Suite,
    decomposeUrl = require('..'),
    nodeUrl = require('url'),
    myBench,
    nodeBench;

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

urls.forEach(function (url) {
    mySuite.add(url, function (url) {
        decomposeUrl(url);
    });
    nodeSuite.add(url, function (url) {
        nodeUrl.parse(url);
    });
});

mySuite.on('complete', function () {
    myBench = this;
}).run();

nodeSuite.on('complete', function () {
    nodeBench = this;
}).run();
