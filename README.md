# url-parser

[![NPM version](https://badge.fury.io/js/url-parser.svg)](http://badge.fury.io/js/url-parser)
[![Build Status](https://travis-ci.org/DavidTPate/url-parser.svg?branch=master)](https://travis-ci.org/DavidTPate/url-parser)
[![Coverage Status](https://img.shields.io/coveralls/DavidTPate/url-parser.svg?branch=master)](https://coveralls.io/r/DavidTPate/url-parser)

A quick and intuitive URL parser which provides a straight-forward and powerful mechanism for parsing URLs
and mapping path parameters. Originally designed for use with Node.js, it can also be used directly in the browser.

## Install

#### NPM
```bash
$ npm install url-parser
```

#### Bower
```bash
bower install --save url-parser
```

## Node.js
```js
var urlParser = require('url-parser')

var parsedUrl = urlParser.parse('http://test.example.com:8000/one/two/three?value=abc&value2=123#david-rules');
// `parsedUrl` now contains the parsed values from the url that was passed. See [Url](#url-model) for the structure.

var parsedUrlWithParams = urlParser.parse('http://test.example.com:8000/one/two/three?value=abc&value2=123#david-rules', '/:value1/:value2/:value3');
// `parsedUrlWithParams` now contains the parsed values from the url that was passed and now parsedUrlWithParams.params is populated with a map of the path parameters that were passed and their values. See [Url](#url-model) for the structure.
```

## Browser
```js
<script src="url-parser.js"></script>
<script>
var parsedUrl = urlParser.parse('http://test.example.com:8000/one/two/three?value=abc&value2=123#david-rules');
// `parsedUrl` now contains the parsed values from the url that was passed. See [Url](#url-model) for the structure.

var parsedUrlWithParams = urlParser.parse('http://test.example.com:8000/one/two/three?value=abc&value2=123#david-rules', '/:value1/:value2/:value3');
// `parsedUrlWithParams` now contains the parsed values from the url that was passed and now parsedUrlWithParams.params is populated with a map of the path parameters that were passed and their values. See [Url](#url-model) for the structure.
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
* `hash` - The original URL that was parsed (eg. 'http://david:l33t5auce#!@mail.google.com/mail/u/0?ui=2&pli=1#inbox')


## License

  [MIT](LICENSE)