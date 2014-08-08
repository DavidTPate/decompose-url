# decompose-url

[![NPM version](https://badge.fury.io/js/decompose-url.svg)](http://badge.fury.io/js/decompose-url)
[![Bower version](https://badge.fury.io/bo/decompose-url.svg)](http://badge.fury.io/bo/decompose-url)
[![Build Status](https://travis-ci.org/DavidTPate/decompose-url.svg?branch=master)](https://travis-ci.org/DavidTPate/decompose-url)
[![Coverage Status](https://img.shields.io/coveralls/DavidTPate/decompose-url.svg?branch=master)](https://coveralls.io/r/DavidTPate/decompose-url)

A quick and easy URL decomposer for breaking URLs into their constituent parts.

## Install

#### NPM
```bash
$ npm install decompose-url
```

#### Bower
```bash
bower install --save decompose-url
```

## Node.js
```js
var decomposeUrl = require('decompose-url')

var decomposedUrl = decomposeUrl('http://test.example.com:8000/one/two/three?value=abc&value2=123#david-rules');
// `decomposedUrl` now contains the decomposed values from the url that was passed. See [Url](#url-model) for the structure.

var decomposedUrlWithParams = decomposeUrl('http://test.example.com:8000/one/two/three?value=abc&value2=123#david-rules', '/:value1/:value2/:value3');
// `decomposedUrlWithParams` now contains the decomposed values from the url that was passed and now decomposedUrlWithParams.params is populated with a map of the path parameters that were passed and their values. See [Url](#url-model) for the structure.
```

## Browser
```js
<script type="text/javascript" src="decompose-url.js"></script>
<script type="text/javascript">
var decomposedUrl = decomposeUrl('http://test.example.com:8000/one/two/three?value=abc&value2=123#david-rules');
// `decomposedUrl` now contains the decomposed values from the url that was passed. See [Url](#url-model) for the structure.

var decomposedUrlWithParams = decomposeUrl('http://test.example.com:8000/one/two/three?value=abc&value2=123#david-rules', '/:value1/:value2/:value3');
// `decomposedUrlWithParams` now contains the decomposed values from the url that was passed and now decomposedUrlWithParams.params is populated with a map of the path parameters that were passed and their values. See [Url](#url-model) for the structure.
</script>
```

## Url Model
* `protocol` - The protocol in the URL, null if none. (eg. 'http')
* `username` - The username in the URL, null if none. (eg. 'david')
* `password` - The password in the URL, null if none. (eg. 'l33t5auce#!')
* `hostname` - The full hostname in the URL, null if none. (eg. 'mail.google.com')
* `host` - An array of the domain names in the URL, null if none. (eg. ['mail', 'google'])
* `tld` - The top level domain in the URL, null if none. (eg. 'com')
* `port` - The port in the URL. Default: 80, if there is a host (eg. '80')
* `path` - An array of the path parts in the URL, null if none. (eg. ['mail', 'u', '0'])
* `params` - A map of the path parameters (only populated if a template was passed) in the URL, null if no template was passed. (eg. { 'user' : 0 })
* `search` - The full search part in the URL, null if none. (eg. 'ui=1&pli=1')
* `query` - A map of the query parameters in the URL, null if none. (eg. { 'ui': '1', 'pli': '1' })
* `hash` - The full hash in the URL, null if none. (eg. 'inbox')
* `hash` - The original URL that was decomposed (eg. 'http://david:l33t5auce#!@mail.google.com/mail/u/0?ui=2&pli=1#inbox')

## Benchmark
```bash
$ npm run-script bench
  
  > decompose-url@0.1.3 bench decompose-url
  > node benchmark/index.js
  
  > node benchmark\absolute-url-simple.js
  
    Parsing URL http://test.example.com/one
  
    1 test completed.
    2 tests completed.
    3 tests completed.
    4 tests completed.
  
    decomposeUrl  x 3,164,959 ops/sec ±0.16% (197 runs sampled)
    nativeUrl     x    68,551 ops/sec ±0.20% (195 runs sampled)
    parseUrl      x    66,756 ops/sec ±0.15% (197 runs sampled)
    fastUrlParser x 2,402,951 ops/sec ±0.15% (196 runs sampled)
  
  > node benchmark\absolute-url.js
  
    Parsing URL http://username:password@test.example.com:8000/one/two/three?value=abc&value2=123#david-rules
  
    1 test completed.
    2 tests completed.
    3 tests completed.
    4 tests completed.
  
    decomposeUrl  x   953,051 ops/sec ±0.18% (195 runs sampled)
    nativeUrl     x    41,731 ops/sec ±0.22% (196 runs sampled)
    parseUrl      x    40,716 ops/sec ±0.25% (196 runs sampled)
    fastUrlParser x 1,147,356 ops/sec ±0.27% (195 runs sampled)
  
  > node benchmark\document-relative-url-simple.js
  
    Parsing URL one
  
    1 test completed.
    2 tests completed.
    3 tests completed.
    4 tests completed.
  
    decomposeUrl  x 4,595,882 ops/sec ±0.17% (196 runs sampled)
    nativeUrl     x   103,029 ops/sec ±0.20% (195 runs sampled)
    parseUrl      x    99,929 ops/sec ±0.27% (194 runs sampled)
    fastUrlParser x 6,307,684 ops/sec ±0.17% (196 runs sampled)
  
  > node benchmark\document-relative-url.js
  
    Parsing URL one/two/three?value=abc&value2=123#david-rules
  
    1 test completed.
    2 tests completed.
    3 tests completed.
    4 tests completed.
  
    decomposeUrl  x 2,319,590 ops/sec ±0.18% (197 runs sampled)
    nativeUrl     x    97,468 ops/sec ±0.22% (194 runs sampled)
    parseUrl      x    93,878 ops/sec ±0.14% (197 runs sampled)
    fastUrlParser x 2,190,844 ops/sec ±0.15% (197 runs sampled)
  
  > node benchmark\protocol-relative-url-simple.js
  
    Parsing URL //test.example.com/one
  
    1 test completed.
    2 tests completed.
    3 tests completed.
    4 tests completed.
  
    decomposeUrl  x 4,373,284 ops/sec ±0.18% (195 runs sampled)
    nativeUrl     x   106,925 ops/sec ±0.16% (195 runs sampled)
    parseUrl      x 4,474,585 ops/sec ±0.19% (197 runs sampled)
    fastUrlParser x 3,423,718 ops/sec ±0.19% (195 runs sampled)
  
  > node benchmark\protocol-relative-url.js
  
    Parsing URL //test.example.com/one/two/three?value=abc&value2=123#david-rules
  
    1 test completed.
    2 tests completed.
    3 tests completed.
    4 tests completed.
  
    decomposeUrl  x 1,109,284 ops/sec ±0.17% (197 runs sampled)
    nativeUrl     x      0.00 ops/sec ±196.00% (196 runs sampled)
    parseUrl      x    90,579 ops/sec ±0.21% (197 runs sampled)
    fastUrlParser x 1,759,856 ops/sec ±0.18% (197 runs sampled)
  
  > node benchmark\query-string-parsing.js
  
    Parsing URL ?value=abc&value2=123
  
    1 test completed.
    2 tests completed.
    3 tests completed.
    4 tests completed.
  
    decomposeUrl  x 456,948 ops/sec ±0.18% (197 runs sampled)
    nativeUrl     x  56,734 ops/sec ±0.50% (195 runs sampled)
    parseUrl      x 100,535 ops/sec ±0.27% (194 runs sampled)
    fastUrlParser x 246,688 ops/sec ±0.23% (196 runs sampled)
  
  > node benchmark\root-relative-url-simple.js
  
    Parsing URL /one
  
    1 test completed.
    2 tests completed.
    3 tests completed.
    4 tests completed.
  
    decomposeUrl  x 6,102,566 ops/sec ±0.20% (196 runs sampled)
    nativeUrl     x   105,955 ops/sec ±0.34% (196 runs sampled)
    parseUrl      x 4,848,949 ops/sec ±0.24% (194 runs sampled)
    fastUrlParser x 6,854,045 ops/sec ±0.19% (197 runs sampled)
  
  > node benchmark\root-relative-url.js
  
    Parsing URL /one/two/three?value=abc&value2=123#david-rules
  
    1 test completed.
    2 tests completed.
    3 tests completed.
    4 tests completed.
  
    decomposeUrl  x 2,638,920 ops/sec ±0.16% (196 runs sampled)
    nativeUrl     x    98,932 ops/sec ±0.24% (193 runs sampled)
    parseUrl      x    92,791 ops/sec ±0.21% (196 runs sampled)
    fastUrlParser x 2,267,078 ops/sec ±0.18% (197 runs sampled)
```

## License

  [MIT](LICENSE)