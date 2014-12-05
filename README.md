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
* `href` - The original URL that was decomposed (eg. 'http://david:l33t5auce#!@mail.google.com/mail/u/0?ui=2&pli=1#inbox')

## Benchmark
```bash
$ npm run-script bench
  
  > decompose-url@0.1.3 bench /decompose-url
  > node benchmark/index.js

  > node benchmark/absolute-url.js

    Parsing URL http://test.example.com:8000/one/two/three?value=abc&value2=123#david-rules

    4 tests completed.

    decomposeUrl  x 1,652,997 ops/sec ±1.87% (184 runs sampled)
    nativeUrl     x    63,392 ops/sec ±2.01% (187 runs sampled)
    parseUrl      x    58,328 ops/sec ±2.56% (184 runs sampled)
    fastUrlParser x 1,167,731 ops/sec ±1.94% (187 runs sampled)

  > node benchmark/document-relative-url.js

    Parsing URL one/two/three?value=abc&value2=123#david-rules

    4 tests completed.

    decomposeUrl  x 2,058,480 ops/sec ±2.23% (189 runs sampled)
    nativeUrl     x    83,121 ops/sec ±12.07% (139 runs sampled)
    parseUrl      x    48,490 ops/sec ±3.60% (159 runs sampled)
    fastUrlParser x   968,205 ops/sec ±2.65% (167 runs sampled)

  > node benchmark/full-url.js

    Parsing URL http://username:password@test.example.com:8000/one/two/three?value=abc&value2=123#david-rules

    4 tests completed.

    decomposeUrl  x 669,968 ops/sec ±3.29% (156 runs sampled)
    nativeUrl     x  19,319 ops/sec ±5.41% (175 runs sampled)
    parseUrl      x  18,269 ops/sec ±3.41% (167 runs sampled)
    fastUrlParser x 436,374 ops/sec ±2.92% (176 runs sampled)

  > node benchmark/ipv4-url.js

    Parsing URL http://192.168.0.1

    4 tests completed.

    decomposeUrl  x 1,121,929 ops/sec ±2.34% (173 runs sampled)
    nativeUrl     x    31,339 ops/sec ±3.41% (170 runs sampled)
    parseUrl      x    31,255 ops/sec ±3.22% (166 runs sampled)
    fastUrlParser x 2,343,268 ops/sec ±1.39% (186 runs sampled)

  > node benchmark/ipv6-and-ipv4-url.js

    Parsing URL http://[a:b:c:d:e::1.2.3.4]

    4 tests completed.

    decomposeUrl  x 1,850,250 ops/sec ±2.31% (182 runs sampled)
    nativeUrl     x    89,970 ops/sec ±0.78% (190 runs sampled)
    parseUrl      x    90,163 ops/sec ±0.41% (191 runs sampled)
    fastUrlParser x 1,075,966 ops/sec ±1.83% (182 runs sampled)

  > node benchmark/ipv6-url.js

    Parsing URL http://[1080:0:0:0:8:800:200C:417A]

    4 tests completed.

    decomposeUrl  x 3,103,880 ops/sec ±0.41% (191 runs sampled)
    nativeUrl     x    86,343 ops/sec ±1.69% (190 runs sampled)
    parseUrl      x    89,950 ops/sec ±0.71% (192 runs sampled)
    fastUrlParser x   923,290 ops/sec ±1.03% (190 runs sampled)

  > node benchmark/ipvFuture-url.js

    Parsing URL http://[v1.09azAZ-._~!$&'()*+,;=:]

    4 tests completed.

    decomposeUrl  x 2,844,585 ops/sec ±0.50% (191 runs sampled)
    nativeUrl     x    64,246 ops/sec ±2.59% (180 runs sampled)
    parseUrl      x    58,976 ops/sec ±3.52% (181 runs sampled)
    fastUrlParser x   905,507 ops/sec ±1.20% (188 runs sampled)

  > node benchmark/protocol-relative-url.js

    Parsing URL //test.example.com/one/two/three?value=abc&value2=123#david-rules

    4 tests completed.

    decomposeUrl  x 1,946,879 ops/sec ±0.48% (193 runs sampled)
    nativeUrl     x    98,356 ops/sec ±0.70% (188 runs sampled)
    parseUrl      x    90,389 ops/sec ±1.23% (188 runs sampled)
    fastUrlParser x 1,702,713 ops/sec ±0.97% (191 runs sampled)

  > node benchmark/root-relative-url.js

    Parsing URL /one/two/three?value=abc&value2=123#david-rules

    4 tests completed.

    decomposeUrl  x 2,521,862 ops/sec ±1.65% (188 runs sampled)
    nativeUrl     x   104,484 ops/sec ±2.62% (183 runs sampled)
    parseUrl      x   105,921 ops/sec ±1.57% (190 runs sampled)
    fastUrlParser x 2,068,764 ops/sec ±2.19% (186 runs sampled)
```

## License

  [MIT](LICENSE)
