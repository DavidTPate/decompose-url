var urlParser = require('..'),
    should = require('should');

describe('url-parser(url)', function () {
    it('should parse an absolute URL', function () {
        var parsed = urlParser.parse('http://test.example.com:8000/one/two/three?value=abc&value2=123#david-rules');

        parsed.protocol.should.be.exactly('http');
        (!!!parsed.username).should.be.true;
        (!!!parsed.password).should.be.true;
        parsed.hostname.should.be.exactly('test.example.com');
        parsed.host[0].should.be.exactly('test');
        parsed.host[1].should.be.exactly('example');
        parsed.tld.should.be.exactly('com');
        parsed.port.should.be.exactly('8000');
        parsed.pathname.should.be.exactly('/one/two/three');
        parsed.path[0].should.be.exactly('one');
        parsed.path[1].should.be.exactly('two');
        parsed.path[2].should.be.exactly('three');
        (!!!parsed.params).should.be.true;
        parsed.search.should.be.exactly('value=abc&value2=123');
        parsed.query.value.should.be.exactly('abc');
        parsed.query.value2.should.be.exactly('123');
        parsed.hash.should.be.exactly('david-rules');
        parsed.href.should.be.exactly('http://test.example.com:8000/one/two/three?value=abc&value2=123#david-rules');
    });
    it('should parse an absolute URL with authentication', function () {
        var parsed = urlParser.parse('http://username:password@test.example.com:8000/one/two/three?value=abc&value2=123#david-rules');

        parsed.protocol.should.be.exactly('http');
        parsed.username.should.be.exactly('username');
        parsed.password.should.be.exactly('password');
        parsed.hostname.should.be.exactly('test.example.com');
        parsed.host[0].should.be.exactly('test');
        parsed.host[1].should.be.exactly('example');
        parsed.tld.should.be.exactly('com');
        parsed.port.should.be.exactly('8000');
        parsed.pathname.should.be.exactly('/one/two/three');
        parsed.path[0].should.be.exactly('one');
        parsed.path[1].should.be.exactly('two');
        parsed.path[2].should.be.exactly('three');
        (!!!parsed.params).should.be.true;
        parsed.search.should.be.exactly('value=abc&value2=123');
        parsed.query.value.should.be.exactly('abc');
        parsed.query.value2.should.be.exactly('123');
        parsed.hash.should.be.exactly('david-rules');
        parsed.href.should.be.exactly('http://username:password@test.example.com:8000/one/two/three?value=abc&value2=123#david-rules');
    });
    it('should parse a protocol relative URL', function () {
        var parsed = urlParser.parse('//test.example.com/one/two/three?value=abc&value2=123#david-rules');

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.username).should.be.true;
        (!!!parsed.password).should.be.true;
        parsed.hostname.should.be.exactly('test.example.com');
        parsed.host[0].should.be.exactly('test');
        parsed.host[1].should.be.exactly('example');
        parsed.tld.should.be.exactly('com');
        parsed.port.should.be.exactly('80');
        parsed.pathname.should.be.exactly('/one/two/three');
        parsed.path[0].should.be.exactly('one');
        parsed.path[1].should.be.exactly('two');
        parsed.path[2].should.be.exactly('three');
        (!!!parsed.params).should.be.true;
        parsed.search.should.be.exactly('value=abc&value2=123');
        parsed.query.value.should.be.exactly('abc');
        parsed.query.value2.should.be.exactly('123');
        parsed.hash.should.be.exactly('david-rules');
        parsed.href.should.be.exactly('//test.example.com/one/two/three?value=abc&value2=123#david-rules');
    });
    it('should parse a protocol relative URL with authentication', function () {
        var parsed = urlParser.parse('//username:password@test.example.com/one/two/three?value=abc&value2=123#david-rules');

        (!!!parsed.protocol).should.be.true;
        parsed.username.should.be.exactly('username');
        parsed.password.should.be.exactly('password');
        parsed.hostname.should.be.exactly('test.example.com');
        parsed.host[0].should.be.exactly('test');
        parsed.host[1].should.be.exactly('example');
        parsed.tld.should.be.exactly('com');
        parsed.port.should.be.exactly('80');
        parsed.pathname.should.be.exactly('/one/two/three');
        parsed.path[0].should.be.exactly('one');
        parsed.path[1].should.be.exactly('two');
        parsed.path[2].should.be.exactly('three');
        (!!!parsed.params).should.be.true;
        parsed.search.should.be.exactly('value=abc&value2=123');
        parsed.query.value.should.be.exactly('abc');
        parsed.query.value2.should.be.exactly('123');
        parsed.hash.should.be.exactly('david-rules');
        parsed.href.should.be.exactly('//username:password@test.example.com/one/two/three?value=abc&value2=123#david-rules');
    });
    it('should parse a root relative URL', function () {
        var parsed = urlParser.parse('/one/two/three?value=abc&value2=123#david-rules');

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.username).should.be.true;
        (!!!parsed.password).should.be.true;
        (!!!parsed.hostname).should.be.true;
        (!!!parsed.host).should.be.true;
        (!!!parsed.tld).should.be.true;
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('/one/two/three');
        parsed.path[0].should.be.exactly('one');
        parsed.path[1].should.be.exactly('two');
        parsed.path[2].should.be.exactly('three');
        (!!!parsed.params).should.be.true;
        parsed.search.should.be.exactly('value=abc&value2=123');
        parsed.query.value.should.be.exactly('abc');
        parsed.query.value2.should.be.exactly('123');
        parsed.hash.should.be.exactly('david-rules');
        parsed.href.should.be.exactly('/one/two/three?value=abc&value2=123#david-rules');
    });
    it('should parse a document relative URL', function () {
        var parsed = urlParser.parse('one/two/three?value=abc&value2=123#david-rules');

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.username).should.be.true;
        (!!!parsed.password).should.be.true;
        (!!!parsed.hostname).should.be.true;
        (!!!parsed.host).should.be.true;
        (!!!parsed.tld).should.be.true;
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('one/two/three');
        parsed.path[0].should.be.exactly('one');
        parsed.path[1].should.be.exactly('two');
        parsed.path[2].should.be.exactly('three');
        (!!!parsed.params).should.be.true;
        parsed.search.should.be.exactly('value=abc&value2=123');
        parsed.query.value.should.be.exactly('abc');
        parsed.query.value2.should.be.exactly('123');
        parsed.hash.should.be.exactly('david-rules');
        parsed.href.should.be.exactly('one/two/three?value=abc&value2=123#david-rules');
    });
    it('should parse a document relative URL with duplicate query parameters', function () {
        var parsed = urlParser.parse('one/two/three?value=abc&value=123&value2=123#david-rules');

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.username).should.be.true;
        (!!!parsed.password).should.be.true;
        (!!!parsed.hostname).should.be.true;
        (!!!parsed.host).should.be.true;
        (!!!parsed.tld).should.be.true;
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('one/two/three');
        parsed.path[0].should.be.exactly('one');
        parsed.path[1].should.be.exactly('two');
        parsed.path[2].should.be.exactly('three');
        (!!!parsed.params).should.be.true;
        parsed.search.should.be.exactly('value=abc&value=123&value2=123');
        parsed.query.value[0].should.be.exactly('abc');
        parsed.query.value[1].should.be.exactly('123');
        parsed.query.value2.should.be.exactly('123');
        parsed.hash.should.be.exactly('david-rules');
        parsed.href.should.be.exactly('one/two/three?value=abc&value=123&value2=123#david-rules');
    });
});

describe('url-parser(url, template)', function () {
    it('should parse an absolute URL with a template', function () {
        var parsed = urlParser.parse('http://test.example.com:8000/one/two/three?value=abc&value2=123#david-rules', '/:value1/:value2/:value3');

        parsed.protocol.should.be.exactly('http');
        (!!!parsed.username).should.be.true;
        (!!!parsed.password).should.be.true;
        parsed.hostname.should.be.exactly('test.example.com');
        parsed.host[0].should.be.exactly('test');
        parsed.host[1].should.be.exactly('example');
        parsed.tld.should.be.exactly('com');
        parsed.port.should.be.exactly('8000');
        parsed.pathname.should.be.exactly('/one/two/three');
        parsed.path[0].should.be.exactly('one');
        parsed.path[1].should.be.exactly('two');
        parsed.path[2].should.be.exactly('three');
        parsed.params.value1.should.be.exactly('one');
        parsed.params.value2.should.be.exactly('two');
        parsed.params.value3.should.be.exactly('three');
        parsed.search.should.be.exactly('value=abc&value2=123');
        parsed.query.value.should.be.exactly('abc');
        parsed.query.value2.should.be.exactly('123');
        parsed.hash.should.be.exactly('david-rules');
        parsed.href.should.be.exactly('http://test.example.com:8000/one/two/three?value=abc&value2=123#david-rules');

        parsed.param
    });
    it('should parse an absolute URL with authentication with a template', function () {
        var parsed = urlParser.parse('http://username:password@test.example.com:8000/one/two/three?value=abc&value2=123#david-rules', '/:value1/:value2/:value3');

        parsed.protocol.should.be.exactly('http');
        parsed.username.should.be.exactly('username');
        parsed.password.should.be.exactly('password');
        parsed.hostname.should.be.exactly('test.example.com');
        parsed.host[0].should.be.exactly('test');
        parsed.host[1].should.be.exactly('example');
        parsed.tld.should.be.exactly('com');
        parsed.port.should.be.exactly('8000');
        parsed.pathname.should.be.exactly('/one/two/three');
        parsed.path[0].should.be.exactly('one');
        parsed.path[1].should.be.exactly('two');
        parsed.path[2].should.be.exactly('three');
        parsed.params.value1.should.be.exactly('one');
        parsed.params.value2.should.be.exactly('two');
        parsed.params.value3.should.be.exactly('three');
        parsed.search.should.be.exactly('value=abc&value2=123');
        parsed.query.value.should.be.exactly('abc');
        parsed.query.value2.should.be.exactly('123');
        parsed.hash.should.be.exactly('david-rules');
        parsed.href.should.be.exactly('http://username:password@test.example.com:8000/one/two/three?value=abc&value2=123#david-rules');
    });
    it('should parse a protocol relative URL with a template', function () {
        var parsed = urlParser.parse('//test.example.com/one/two/three?value=abc&value2=123#david-rules', '/:value1/:value2/:value3');

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.username).should.be.true;
        (!!!parsed.password).should.be.true;
        parsed.hostname.should.be.exactly('test.example.com');
        parsed.host[0].should.be.exactly('test');
        parsed.host[1].should.be.exactly('example');
        parsed.tld.should.be.exactly('com');
        parsed.port.should.be.exactly('80');
        parsed.pathname.should.be.exactly('/one/two/three');
        parsed.path[0].should.be.exactly('one');
        parsed.path[1].should.be.exactly('two');
        parsed.path[2].should.be.exactly('three');
        parsed.params.value1.should.be.exactly('one');
        parsed.params.value2.should.be.exactly('two');
        parsed.params.value3.should.be.exactly('three');
        parsed.search.should.be.exactly('value=abc&value2=123');
        parsed.query.value.should.be.exactly('abc');
        parsed.query.value2.should.be.exactly('123');
        parsed.hash.should.be.exactly('david-rules');
        parsed.href.should.be.exactly('//test.example.com/one/two/three?value=abc&value2=123#david-rules');
    });
    it('should parse a protocol relative URL with authentication with a template', function () {
        var parsed = urlParser.parse('//username:password@test.example.com/one/two/three?value=abc&value2=123#david-rules', '/:value1/:value2/:value3');

        (!!!parsed.protocol).should.be.true;
        parsed.username.should.be.exactly('username');
        parsed.password.should.be.exactly('password');
        parsed.hostname.should.be.exactly('test.example.com');
        parsed.host[0].should.be.exactly('test');
        parsed.host[1].should.be.exactly('example');
        parsed.tld.should.be.exactly('com');
        parsed.port.should.be.exactly('80');
        parsed.pathname.should.be.exactly('/one/two/three');
        parsed.path[0].should.be.exactly('one');
        parsed.path[1].should.be.exactly('two');
        parsed.path[2].should.be.exactly('three');
        parsed.params.value1.should.be.exactly('one');
        parsed.params.value2.should.be.exactly('two');
        parsed.params.value3.should.be.exactly('three');
        parsed.search.should.be.exactly('value=abc&value2=123');
        parsed.query.value.should.be.exactly('abc');
        parsed.query.value2.should.be.exactly('123');
        parsed.hash.should.be.exactly('david-rules');
        parsed.href.should.be.exactly('//username:password@test.example.com/one/two/three?value=abc&value2=123#david-rules');
    });
    it('should parse a root relative URL with a template', function () {
        var parsed = urlParser.parse('/one/two/three?value=abc&value2=123#david-rules', '/:value1/:value2/:value3');

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.username).should.be.true;
        (!!!parsed.password).should.be.true;
        (!!!parsed.hostname).should.be.true;
        (!!!parsed.host).should.be.true;
        (!!!parsed.tld).should.be.true;
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('/one/two/three');
        parsed.path[0].should.be.exactly('one');
        parsed.path[1].should.be.exactly('two');
        parsed.path[2].should.be.exactly('three');
        parsed.params.value1.should.be.exactly('one');
        parsed.params.value2.should.be.exactly('two');
        parsed.params.value3.should.be.exactly('three');
        parsed.search.should.be.exactly('value=abc&value2=123');
        parsed.query.value.should.be.exactly('abc');
        parsed.query.value2.should.be.exactly('123');
        parsed.hash.should.be.exactly('david-rules');
        parsed.href.should.be.exactly('/one/two/three?value=abc&value2=123#david-rules');
    });
    it('should parse a document relative URL with a template', function () {
        var parsed = urlParser.parse('one/two/three?value=abc&value2=123#david-rules', '/:value1/:value2/:value3');

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.username).should.be.true;
        (!!!parsed.password).should.be.true;
        (!!!parsed.hostname).should.be.true;
        (!!!parsed.host).should.be.true;
        (!!!parsed.tld).should.be.true;
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('one/two/three');
        parsed.path[0].should.be.exactly('one');
        parsed.path[1].should.be.exactly('two');
        parsed.path[2].should.be.exactly('three');
        parsed.params.value1.should.be.exactly('one');
        parsed.params.value2.should.be.exactly('two');
        parsed.params.value3.should.be.exactly('three');
        parsed.search.should.be.exactly('value=abc&value2=123');
        parsed.query.value.should.be.exactly('abc');
        parsed.query.value2.should.be.exactly('123');
        parsed.hash.should.be.exactly('david-rules');
        parsed.href.should.be.exactly('one/two/three?value=abc&value2=123#david-rules');
    });
    it('should parse a document relative URL with duplicate query parameters and a partial template', function () {
        var parsed = urlParser.parse('one/two/three?value=abc&value=123&value2=123#david-rules', '/:value1/:value2');

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.username).should.be.true;
        (!!!parsed.password).should.be.true;
        (!!!parsed.hostname).should.be.true;
        (!!!parsed.host).should.be.true;
        (!!!parsed.tld).should.be.true;
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('one/two/three');
        parsed.path[0].should.be.exactly('one');
        parsed.path[1].should.be.exactly('two');
        parsed.path[2].should.be.exactly('three');
        parsed.params.value1.should.be.exactly('one');
        parsed.params.value2.should.be.exactly('two');
        parsed.search.should.be.exactly('value=abc&value=123&value2=123');
        parsed.query.value[0].should.be.exactly('abc');
        parsed.query.value[1].should.be.exactly('123');
        parsed.query.value2.should.be.exactly('123');
        parsed.hash.should.be.exactly('david-rules');
        parsed.href.should.be.exactly('one/two/three?value=abc&value=123&value2=123#david-rules');
    });
});