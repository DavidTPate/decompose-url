var decomposeUrl = require('..'),
    should = require('should');

describe('decompose-url.parse(url)', function () {
    it('should parse an absolute URL', function () {
        var parsed = decomposeUrl.parse('https://test.example.com:8000/one/two/three?value=abc&value2=123#david-rules');

        parsed.protocol.should.be.exactly('https:');
        (!!!parsed.auth).should.be.true;
        parsed.hostname.should.be.exactly('test.example.com');
        parsed.host.should.be.exactly('test.example.com:8000');
        parsed.port.should.be.exactly('8000');
        parsed.pathname.should.be.exactly('/one/two/three');
        parsed.path.should.be.exactly('/one/two/three?value=abc&value2=123');
        parsed.search.should.be.exactly('?value=abc&value2=123');
        parsed.query.should.be.exactly('value=abc&value2=123');
        parsed.hash.should.be.exactly('#david-rules');
        parsed.href.should.be.exactly('https://test.example.com:8000/one/two/three?value=abc&value2=123#david-rules');
    });
    it('should parse an absolute URL with an IP address', function () {
        var parsed = decomposeUrl.parse('http://127.0.0.1:8000/one/two/three?value=abc&value2=123#david-rules', true);

        parsed.protocol.should.be.exactly('http:');
        (!!!parsed.auth).should.be.true;
        parsed.hostname.should.be.exactly('127.0.0.1');
        parsed.host.should.be.exactly('127.0.0.1:8000');
        parsed.port.should.be.exactly('8000');
        parsed.pathname.should.be.exactly('/one/two/three');
        parsed.path.should.be.exactly('/one/two/three?value=abc&value2=123');
        parsed.search.should.be.exactly('?value=abc&value2=123');
        parsed.query.value.should.be.exactly('abc');
        parsed.query.value2.should.be.exactly('123');
        parsed.hash.should.be.exactly('#david-rules');
        parsed.href.should.be.exactly('http://127.0.0.1:8000/one/two/three?value=abc&value2=123#david-rules');
    });
    it('should parse an absolute URL with authentication', function () {
        var parsed = decomposeUrl.parse('http://username:password@test.example.com:8000/one/two/three?value=abc&value2=123#david-rules', true);

        parsed.protocol.should.be.exactly('http:');
        parsed.auth.should.be.exactly('username:password');
        parsed.hostname.should.be.exactly('test.example.com');
        parsed.host.should.be.exactly('test.example.com:8000');
        parsed.port.should.be.exactly('8000');
        parsed.pathname.should.be.exactly('/one/two/three');
        parsed.path.should.be.exactly('/one/two/three?value=abc&value2=123');
        parsed.search.should.be.exactly('?value=abc&value2=123');
        parsed.query.value.should.be.exactly('abc');
        parsed.query.value2.should.be.exactly('123');
        parsed.hash.should.be.exactly('#david-rules');
        parsed.href.should.be.exactly('http://username:password@test.example.com:8000/one/two/three?value=abc&value2=123#david-rules');
    });
    it('should parse an absolute URL on localhost', function () {
        var parsed = decomposeUrl.parse('http://localhost:8000/one/two/three?value=abc&value2=123#david-rules');

        parsed.protocol.should.be.exactly('http:');
        (!!!parsed.auth).should.be.true;
        parsed.hostname.should.be.exactly('localhost');
        parsed.host.should.be.exactly('localhost:8000');
        parsed.pathname.should.be.exactly('/one/two/three');
        parsed.path.should.be.exactly('/one/two/three?value=abc&value2=123');
        parsed.search.should.be.exactly('?value=abc&value2=123');
        parsed.query.should.be.exactly('value=abc&value2=123');
        parsed.hash.should.be.exactly('#david-rules');
        parsed.href.should.be.exactly('http://localhost:8000/one/two/three?value=abc&value2=123#david-rules');
    });
    it('should parse an absolute URL on localhost without a port', function () {
        var parsed = decomposeUrl.parse('http://localhost/one/two/three?value=abc&value2=123#david-rules', true);

        parsed.protocol.should.be.exactly('http:');
        (!!!parsed.auth).should.be.true;
        parsed.hostname.should.be.exactly('localhost');
        parsed.host.should.be.exactly('localhost');
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('/one/two/three');
        parsed.path.should.be.exactly('/one/two/three?value=abc&value2=123');
        parsed.search.should.be.exactly('?value=abc&value2=123');
        parsed.query.value.should.be.exactly('abc');
        parsed.query.value2.should.be.exactly('123');
        parsed.hash.should.be.exactly('#david-rules');
        parsed.href.should.be.exactly('http://localhost/one/two/three?value=abc&value2=123#david-rules');
    });
    it('should parse a protocol relative URL', function () {
        var parsed = decomposeUrl.parse('//test.example.com/one/two/three?value=abc&value2=123#david-rules', null, true);

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.auth).should.be.true;
        parsed.hostname.should.be.exactly('test.example.com');
        parsed.host.should.be.exactly('test.example.com');
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('/one/two/three');
        parsed.path.should.be.exactly('/one/two/three?value=abc&value2=123');
        parsed.search.should.be.exactly('?value=abc&value2=123');
        parsed.query.should.be.exactly('value=abc&value2=123');
        parsed.hash.should.be.exactly('#david-rules');
        parsed.href.should.be.exactly('//test.example.com/one/two/three?value=abc&value2=123#david-rules');
    });
    it('should parse a protocol relative URL with authentication', function () {
        var parsed = decomposeUrl.parse('//username:password@test.example.com/one/two/three?value=abc&value2=123#david-rules', true, true);

        (!!!parsed.protocol).should.be.true;
        parsed.auth.should.be.exactly('username:password');
        parsed.hostname.should.be.exactly('test.example.com');
        parsed.host.should.be.exactly('test.example.com');
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('/one/two/three');
        parsed.path.should.be.exactly('/one/two/three?value=abc&value2=123');
        parsed.search.should.be.exactly('?value=abc&value2=123');
        parsed.query.value.should.be.exactly('abc');
        parsed.query.value2.should.be.exactly('123');
        parsed.hash.should.be.exactly('#david-rules');
        parsed.href.should.be.exactly('//username:password@test.example.com/one/two/three?value=abc&value2=123#david-rules');
    });
    it('should parse a protocol relative URL pointing to the root', function () {
        var parsed = decomposeUrl.parse('//', null, true);

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.auth).should.be.true;
        (!!!parsed.hostname).should.be.true;
        (!!!parsed.host).should.be.true;
        (!!!parsed.port).should.be.true;
        (!!!parsed.pathname).should.be.true;
        (!!!parsed.path).should.be.true;
        (!!!parsed.search).should.be.true;
        (!!!parsed.query).should.be.true;
        (!!!parsed.hash).should.be.true;
        parsed.href.should.be.exactly('//');
    });
    it('should parse a root relative URL', function () {
        var parsed = decomposeUrl.parse('/one/two/three?value=abc&value2=123#david-rules');

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.auth).should.be.true;
        (!!!parsed.hostname).should.be.true;
        (!!!parsed.host).should.be.true;
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('/one/two/three');
        parsed.path.should.be.exactly('/one/two/three?value=abc&value2=123');
        parsed.search.should.be.exactly('?value=abc&value2=123');
        parsed.query.should.be.exactly('value=abc&value2=123');
        parsed.hash.should.be.exactly('#david-rules');
        parsed.href.should.be.exactly('/one/two/three?value=abc&value2=123#david-rules');
    });
    it('should parse a short root relative URL', function () {
        var parsed = decomposeUrl.parse('/one/two/three');

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.auth).should.be.true;
        (!!!parsed.hostname).should.be.true;
        (!!!parsed.host).should.be.true;
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('/one/two/three');
        parsed.path.should.be.exactly('/one/two/three');
        (!!!parsed.search).should.be.true;
        (!!!parsed.query).should.be.true;
        (!!!parsed.hash).should.be.true;
        parsed.href.should.be.exactly('/one/two/three');
    });
    it('should parse a document relative URL', function () {
        var parsed = decomposeUrl.parse('one/two/three?value=abc&value2=123#david-rules');

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.auth).should.be.true;
        (!!!parsed.hostname).should.be.true;
        (!!!parsed.host).should.be.true;
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('one/two/three');
        parsed.path.should.be.exactly('one/two/three?value=abc&value2=123');
        parsed.search.should.be.exactly('?value=abc&value2=123');
        parsed.query.should.be.exactly('value=abc&value2=123');
        parsed.hash.should.be.exactly('#david-rules');
        parsed.href.should.be.exactly('one/two/three?value=abc&value2=123#david-rules');
    });
    it('should parse a document relative URL with duplicate query parameters', function () {
        var parsed = decomposeUrl.parse('one/two/three?value=abc&value=123&value2=123#david-rules', true);

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.auth).should.be.true;
        (!!!parsed.hostname).should.be.true;
        (!!!parsed.host).should.be.true;
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('one/two/three');
        parsed.path.should.be.exactly('one/two/three?value=abc&value=123&value2=123');
        parsed.search.should.be.exactly('?value=abc&value=123&value2=123');
        parsed.query.value[0].should.be.exactly('abc');
        parsed.query.value[1].should.be.exactly('123');
        parsed.query.value2.should.be.exactly('123');
        parsed.hash.should.be.exactly('#david-rules');
        parsed.href.should.be.exactly('one/two/three?value=abc&value=123&value2=123#david-rules');
    });
    it('should parse a document relative URL with triplicate query parameters', function () {
        var parsed = decomposeUrl.parse('one/two/three?value=abc&value=123&value=123', true);

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.auth).should.be.true;
        (!!!parsed.hostname).should.be.true;
        (!!!parsed.host).should.be.true;
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('one/two/three');
        parsed.path.should.be.exactly('one/two/three?value=abc&value=123&value=123');
        parsed.search.should.be.exactly('?value=abc&value=123&value=123');
        parsed.query.value[0].should.be.exactly('abc');
        parsed.query.value[1].should.be.exactly('123');
        parsed.query.value[2].should.be.exactly('123');
        (!!!parsed.hash).should.be.true;
        parsed.href.should.be.exactly('one/two/three?value=abc&value=123&value=123');
    });
    it('should parse an URL with only query parameters', function () {
        var parsed = decomposeUrl.parse('?value=abc&value=123&value=123', true);

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.auth).should.be.true;
        (!!!parsed.hostname).should.be.true;
        (!!!parsed.host).should.be.true;
        (!!!parsed.port).should.be.true;
        (!!!parsed.pathname).should.be.true;
        (!!!parsed.path).should.be.true;
        parsed.search.should.be.exactly('?value=abc&value=123&value=123');
        parsed.query.value[0].should.be.exactly('abc');
        parsed.query.value[1].should.be.exactly('123');
        parsed.query.value[2].should.be.exactly('123');
        (!!!parsed.hash).should.be.true;
        parsed.href.should.be.exactly('?value=abc&value=123&value=123');
    });
    it('should parse an URL with only a hash value', function () {
        var parsed = decomposeUrl.parse('#david-rules');

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.auth).should.be.true;
        (!!!parsed.hostname).should.be.true;
        (!!!parsed.host).should.be.true;
        (!!!parsed.port).should.be.true;
        (!!!parsed.pathname).should.be.true;
        (!!!parsed.path).should.be.true;
        (!!!parsed.search).should.be.true;
        (!!!parsed.query).should.be.true;
        parsed.hash.should.be.exactly('#david-rules');
        parsed.href.should.be.exactly('#david-rules');
    });
    it('should parse an URL with an empty query parameter value', function () {
        var parsed = decomposeUrl.parse('one/two/three?value=', true);

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.auth).should.be.true;
        (!!!parsed.hostname).should.be.true;
        (!!!parsed.host).should.be.true;
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('one/two/three');
        parsed.path.should.be.exactly('one/two/three?value=');
        parsed.search.should.be.exactly('?value=');
        parsed.query.value.should.be.exactly('');
        (!!!parsed.hash).should.be.true;
        parsed.href.should.be.exactly('one/two/three?value=');
    });
    it('should parse an URL with an empty query parameter missing an equals', function () {
        var parsed = decomposeUrl.parse('one/two/three?value', true);

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.auth).should.be.true;
        (!!!parsed.hostname).should.be.true;
        (!!!parsed.host).should.be.true;
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('one/two/three');
        parsed.path.should.be.exactly('one/two/three?value');
        parsed.search.should.be.exactly('?value');
        parsed.query.value.should.be.exactly('');
        (!!!parsed.hash).should.be.true;
        parsed.href.should.be.exactly('one/two/three?value');
    });
    it('should parse an URL without query parameters but with a question mark', function () {
        var parsed = decomposeUrl.parse('one/two/three?', true);

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.auth).should.be.true;
        (!!!parsed.hostname).should.be.true;
        (!!!parsed.host).should.be.true;
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('one/two/three');
        parsed.path.should.be.exactly('one/two/three?');
        parsed.search.should.be.exactly('?');
        JSON.stringify(parsed.query).should.be.exactly('{}');
        (!!!parsed.hash).should.be.true;
        parsed.href.should.be.exactly('one/two/three?');
    });
    it('should parse an URL with a hanging ampersand query parameter', function () {
        var parsed = decomposeUrl.parse('one/two/three?value=123&', true);

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.auth).should.be.true;
        (!!!parsed.hostname).should.be.true;
        (!!!parsed.host).should.be.true;
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('one/two/three');
        parsed.path.should.be.exactly('one/two/three?value=123&');
        parsed.search.should.be.exactly('?value=123&');
        parsed.query.value.should.be.exactly('123');
        (!!!parsed.hash).should.be.true;
        parsed.href.should.be.exactly('one/two/three?value=123&');
    });
    it('should parse an URL without query parameters', function () {
        var parsed = decomposeUrl.parse('one/two/three#david-rules', true);

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.auth).should.be.true;
        (!!!parsed.hostname).should.be.true;
        (!!!parsed.host).should.be.true;
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('one/two/three');
        parsed.path.should.be.exactly('one/two/three');
        (!!!parsed.search).should.be.true;
        (!!!parsed.query).should.be.true;
        parsed.hash.should.be.exactly('#david-rules');
        parsed.href.should.be.exactly('one/two/three#david-rules');
    });
    it('should parse an URL without a hash value', function () {
        var parsed = decomposeUrl.parse('one/two/three?value=abc&value=123&value2=123');

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.auth).should.be.true;
        (!!!parsed.hostname).should.be.true;
        (!!!parsed.host).should.be.true;
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('one/two/three');
        parsed.path.should.be.exactly('one/two/three?value=abc&value=123&value2=123');
        parsed.search.should.be.exactly('?value=abc&value=123&value2=123');
        parsed.query.should.be.exactly('value=abc&value=123&value2=123');
        (!!!parsed.hash).should.be.true;
        parsed.href.should.be.exactly('one/two/three?value=abc&value=123&value2=123');
    });
    it('should parse an URL without query parameters or a hash value', function () {
        var parsed = decomposeUrl.parse('one/two/three');

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.auth).should.be.true;
        (!!!parsed.hostname).should.be.true;
        (!!!parsed.host).should.be.true;
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('one/two/three');
        parsed.path.should.be.exactly('one/two/three');
        (!!!parsed.search).should.be.true;
        (!!!parsed.query).should.be.true;
        (!!!parsed.hash).should.be.true;
        parsed.href.should.be.exactly('one/two/three');
    });
    it('shouldn\'t parse an empty string', function () {
        (function () {
            decomposeUrl.parse('');
        }).should.throw("Parameter 'url' must be a string, not " + typeof '');
    });
    it('shouldn\'t parse a malformed URL', function () {
        var parsed = decomposeUrl.parse('(╯°□°)╯︵ ┻━┻');

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.auth).should.be.true;
        (!!!parsed.hostname).should.be.true;
        (!!!parsed.host).should.be.true;
        (!!!parsed.port).should.be.true;
        (!!!parsed.pathname).should.be.true;
        (!!!parsed.path).should.be.true;
        (!!!parsed.search).should.be.true;
        (!!!parsed.query).should.be.true;
        (!!!parsed.hash).should.be.true;
        parsed.href.should.be.exactly('(╯°□°)╯︵ ┻━┻');
    });
    it('shouldn\'t parse an undefined URL', function () {
        (function () {
            decomposeUrl.parse(undefined);
        }).should.throw("Parameter 'url' must be a string, not " + typeof undefined);
    });
});

describe('decompose-url.parse(url).getPathParams(template)', function () {
    it('should parse an absolute URL with a template', function () {
        var parsed = decomposeUrl.parse('http://test.example.com:8000/one/two/three?value=abc&value2=123#david-rules');

        parsed.protocol.should.be.exactly('http:');
        (!!!parsed.auth).should.be.true;
        parsed.hostname.should.be.exactly('test.example.com');
        parsed.host.should.be.exactly('test.example.com:8000');
        parsed.port.should.be.exactly('8000');
        parsed.pathname.should.be.exactly('/one/two/three');
        parsed.path.should.be.exactly('/one/two/three?value=abc&value2=123');
        parsed.search.should.be.exactly('?value=abc&value2=123');
        parsed.query.should.be.exactly('value=abc&value2=123');
        parsed.hash.should.be.exactly('#david-rules');
        parsed.href.should.be.exactly('http://test.example.com:8000/one/two/three?value=abc&value2=123#david-rules');

        var params = parsed.getPathParams('/:value1/:value2/:value3');
        params.value1.should.be.exactly('one');
        params.value2.should.be.exactly('two');
        params.value3.should.be.exactly('three');
    });
    it('should parse a document relative URL with a template', function () {
        var parsed = decomposeUrl.parse('one/two/three?value=abc&value2=123#david-rules', true);

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.auth).should.be.true;
        (!!!parsed.hostname).should.be.true;
        (!!!parsed.host).should.be.true;
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('one/two/three');
        parsed.path.should.be.exactly('one/two/three?value=abc&value2=123');
        parsed.search.should.be.exactly('?value=abc&value2=123');
        parsed.query.value.should.be.exactly('abc');
        parsed.query.value2.should.be.exactly('123');
        parsed.hash.should.be.exactly('#david-rules');
        parsed.href.should.be.exactly('one/two/three?value=abc&value2=123#david-rules');

        var params = parsed.getPathParams('/:value1/:value2/:value3');
        params.value1.should.be.exactly('one');
        params.value2.should.be.exactly('two');
        params.value3.should.be.exactly('three');
    });
    it('should parse a document relative URL with duplicate query parameters and a partial template', function () {
        var parsed = decomposeUrl.parse('one/two/three?value=abc&value=123&value2=123#david-rules');

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.auth).should.be.true;
        (!!!parsed.hostname).should.be.true;
        (!!!parsed.host).should.be.true;
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('one/two/three');
        parsed.path.should.be.exactly('one/two/three?value=abc&value=123&value2=123');
        parsed.search.should.be.exactly('?value=abc&value=123&value2=123');
        parsed.query.should.be.exactly('value=abc&value=123&value2=123');
        parsed.hash.should.be.exactly('#david-rules');
        parsed.href.should.be.exactly('one/two/three?value=abc&value=123&value2=123#david-rules');

        var params = parsed.getPathParams('/:value1/:value2');
        params.value1.should.be.exactly('one');
        params.value2.should.be.exactly('two');
    });
    it('should parse an URL with a blank template', function () {
        var parsed = decomposeUrl.parse('one/two/three?value=abc&value2=123#david-rules');

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.auth).should.be.true;
        (!!!parsed.hostname).should.be.true;
        (!!!parsed.host).should.be.true;
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('one/two/three');
        parsed.path.should.be.exactly('one/two/three?value=abc&value2=123');
        parsed.search.should.be.exactly('?value=abc&value2=123');
        parsed.query.should.be.exactly('value=abc&value2=123');
        parsed.hash.should.be.exactly('#david-rules');
        parsed.href.should.be.exactly('one/two/three?value=abc&value2=123#david-rules');

        var params = parsed.getPathParams('');
        JSON.stringify(params).should.be.exactly('{}');
    });
    it('should parse an URL with a template without a leading slash', function () {
        var parsed = decomposeUrl.parse('one/two/three?value=abc&value2=123#david-rules');

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.auth).should.be.true;
        (!!!parsed.hostname).should.be.true;
        (!!!parsed.host).should.be.true;
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('one/two/three');
        parsed.path.should.be.exactly('one/two/three?value=abc&value2=123');
        parsed.search.should.be.exactly('?value=abc&value2=123');
        parsed.query.should.be.exactly('value=abc&value2=123');
        parsed.hash.should.be.exactly('#david-rules');
        parsed.href.should.be.exactly('one/two/three?value=abc&value2=123#david-rules');

        var params = parsed.getPathParams(':value1/:value2/:value3');
        params.value1.should.be.exactly('one');
        params.value2.should.be.exactly('two');
        params.value3.should.be.exactly('three');
    });
    it('should parse an URL with a partial template', function () {
        var parsed = decomposeUrl.parse('one/two/three?value=abc&value2=123#david-rules');

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.auth).should.be.true;
        (!!!parsed.hostname).should.be.true;
        (!!!parsed.host).should.be.true;
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('one/two/three');
        parsed.path.should.be.exactly('one/two/three?value=abc&value2=123');
        parsed.search.should.be.exactly('?value=abc&value2=123');
        parsed.query.should.be.exactly('value=abc&value2=123');
        parsed.hash.should.be.exactly('#david-rules');
        parsed.href.should.be.exactly('one/two/three?value=abc&value2=123#david-rules');

        var params = parsed.getPathParams(':value1/two/:value3');
        params.value1.should.be.exactly('one');
        (!!!params.value2).should.be.true;
        params.value3.should.be.exactly('three');
    });
});