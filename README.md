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

> decompose-url@0.1.1 bench url-parser
> node benchmark/index.js

> node benchmark\absolute-url.js

  Parsing URL http://test.example.com:8000/one/two/three?value=abc&value2=123#david-rules

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  decomposeUrl  x   186,123 ops/sec ±0.18% (196 runs sampled)
  nativeUrl     x    50,832 ops/sec ±0.18% (193 runs sampled)
  parseUrl      x    50,001 ops/sec ±0.22% (195 runs sampled)
  fastUrlParser x 1,326,936 ops/sec ±0.14% (197 runs sampled)

> node benchmark\document-relative-url.js

  Parsing URL one/two/three?value=abc&value2=123#david-rules

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  decomposeUrl  x   252,823 ops/sec ±0.16% (196 runs sampled)
  nativeUrl     x    97,242 ops/sec ±0.27% (192 runs sampled)
  parseUrl      x    93,634 ops/sec ±0.20% (197 runs sampled)
  fastUrlParser x 2,223,832 ops/sec ±0.17% (197 runs sampled)

> node benchmark\full-url.js

  Parsing URL http://username:password@test.example.com:8000/one/two/three?value=abc&value2=123#david-rules

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  decomposeUrl  x   181,265 ops/sec ±0.15% (196 runs sampled)
  nativeUrl     x    43,508 ops/sec ±0.24% (196 runs sampled)
  parseUrl      x    42,568 ops/sec ±0.25% (196 runs sampled)
  fastUrlParser x 1,149,610 ops/sec ±0.19% (197 runs sampled)

> node benchmark\protocol-relative-url.js

  Parsing URL //test.example.com/one/two/three?value=abc&value2=123#david-rules

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  decomposeUrl  x   194,544 ops/sec ±0.15% (195 runs sampled)
  nativeUrl     x    97,379 ops/sec ±0.19% (194 runs sampled)
  parseUrl      x    91,473 ops/sec ±0.15% (196 runs sampled)
  fastUrlParser x 1,753,292 ops/sec ±0.23% (197 runs sampled)

> node benchmark\root-relative-url.js

  Parsing URL /one/two/three?value=abc&value2=123#david-rules

  1 test completed.
  2 tests completed.
  3 tests completed.
  4 tests completed.

  decomposeUrl  x   243,234 ops/sec ±0.16% (197 runs sampled)
  nativeUrl     x    93,427 ops/sec ±0.21% (194 runs sampled)
  parseUrl      x    87,469 ops/sec ±0.16% (197 runs sampled)
  fastUrlParser x 2,278,611 ops/sec ±0.18% (197 runs sampled)
```

## License

  [MIT](LICENSE)