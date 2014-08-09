var decomposeUrl = require('..'),
    should = require('should');

describe('Node.js URL Tests', function () {
    it('should parse an absolute URL with auth', function () {
        var parsed = decomposeUrl.parse('http://asdf:qwer@localhost:80');

        parsed.protocol.should.be.exactly('http:');
        parsed.auth.should.be.exactly('asdf:qwer');
        parsed.hostname.should.be.exactly('localhost');
        parsed.host.should.be.exactly('localhost:80');
        parsed.port.should.be.exactly('80');
        (!!!parsed.pathname).should.be.true;
        (!!!parsed.path).should.be.true;
        (!!!parsed.search).should.be.true;
        (!!!parsed.query).should.be.true;
        (!!!parsed.hash).should.be.true;
        parsed.href.should.be.exactly('http://asdf:qwer@localhost:80');
    });
    it('should parse an absolute URL with auth having an encoded value', function () {
        var parsed = decomposeUrl.parse('http://user:pass%3A@localhost:80');

        parsed.protocol.should.be.exactly('http:');
        parsed.auth.should.be.exactly('user:pass:');
        parsed.hostname.should.be.exactly('localhost');
        parsed.host.should.be.exactly('localhost:80');
        parsed.port.should.be.exactly('80');
        (!!!parsed.pathname).should.be.true;
        (!!!parsed.path).should.be.true;
        (!!!parsed.search).should.be.true;
        (!!!parsed.query).should.be.true;
        (!!!parsed.hash).should.be.true;
        parsed.href.should.be.exactly('http://user:pass%3A@localhost:80');
    });
    it('should parse an absolute URL without anything extra', function () {
        var parsed = decomposeUrl.parse('http://localhost:80');

        parsed.protocol.should.be.exactly('http:');
        (!!!parsed.auth).should.be.true;
        parsed.hostname.should.be.exactly('localhost');
        parsed.host.should.be.exactly('localhost:80');
        parsed.port.should.be.exactly('80');
        (!!!parsed.pathname).should.be.true;
        (!!!parsed.path).should.be.true;
        (!!!parsed.search).should.be.true;
        (!!!parsed.query).should.be.true;
        (!!!parsed.hash).should.be.true;
        parsed.href.should.be.exactly('http://localhost:80');
    });
    it('should parse a secure absolute URL without anything extra', function () {
        var parsed = decomposeUrl.parse('https://localhost:80');

        parsed.protocol.should.be.exactly('https:');
        (!!!parsed.auth).should.be.true;
        parsed.hostname.should.be.exactly('localhost');
        parsed.host.should.be.exactly('localhost:80');
        parsed.port.should.be.exactly('80');
        (!!!parsed.pathname).should.be.true;
        (!!!parsed.path).should.be.true;
        (!!!parsed.search).should.be.true;
        (!!!parsed.query).should.be.true;
        (!!!parsed.hash).should.be.true;
        parsed.href.should.be.exactly('https://localhost:80');
    });
    it('should parse an absolute URL with a path', function () {
        var parsed = decomposeUrl.parse('http://localhost:80/asdf');

        parsed.protocol.should.be.exactly('http:');
        (!!!parsed.auth).should.be.true;
        parsed.hostname.should.be.exactly('localhost');
        parsed.host.should.be.exactly('localhost:80');
        parsed.port.should.be.exactly('80');
        parsed.pathname.should.be.exactly('/asdf');
        parsed.path.should.be.exactly('/asdf');
        (!!!parsed.search).should.be.true;
        (!!!parsed.query).should.be.true;
        (!!!parsed.hash).should.be.true;
        parsed.href.should.be.exactly('http://localhost:80/asdf');
    });
    it('should parse an absolute URL with a path and query string', function () {
        var parsed = decomposeUrl.parse('http://localhost:80/asdf?qwer=zxcv');

        parsed.protocol.should.be.exactly('http:');
        (!!!parsed.auth).should.be.true;
        parsed.hostname.should.be.exactly('localhost');
        parsed.host.should.be.exactly('localhost:80');
        parsed.port.should.be.exactly('80');
        parsed.pathname.should.be.exactly('/asdf');
        parsed.path.should.be.exactly('/asdf?qwer=zxcv');
        parsed.search.should.be.exactly('?qwer=zxcv');
        parsed.query.should.be.exactly('qwer=zxcv');
        (!!!parsed.hash).should.be.true;
        parsed.href.should.be.exactly('http://localhost:80/asdf?qwer=zxcv');
    });
    it('should parse an absolute URL with mixed case', function () {
        var parsed = decomposeUrl.parse('HTTP://www.ExAmPlE.com/');

        parsed.protocol.should.be.exactly('HTTP:');
        (!!!parsed.auth).should.be.true;
        parsed.hostname.should.be.exactly('www.ExAmPlE.com');
        parsed.host.should.be.exactly('www.ExAmPlE.com');
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('/');
        parsed.path.should.be.exactly('/');
        (!!!parsed.search).should.be.true;
        (!!!parsed.query).should.be.true;
        (!!!parsed.hash).should.be.true;
        parsed.href.should.be.exactly('HTTP://www.ExAmPlE.com/');
    });
    it('should parse an absolute URL with an invalid query string', function () {
        var parsed = decomposeUrl.parse('http://mt0.google.com/vt/lyrs=m@114&hl=en&src=api&x=2&y=2&z=3&s=');

        parsed.protocol.should.be.exactly('http:');
        (!!!parsed.auth).should.be.true;
        parsed.hostname.should.be.exactly('mt0.google.com');
        parsed.host.should.be.exactly('mt0.google.com');
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('/vt/lyrs=m@114&hl=en&src=api&x=2&y=2&z=3&s=');
        parsed.path.should.be.exactly('/vt/lyrs=m@114&hl=en&src=api&x=2&y=2&z=3&s=');
        (!!!parsed.search).should.be.true;
        (!!!parsed.query).should.be.true;
        (!!!parsed.hash).should.be.true;
        parsed.href.should.be.exactly('http://mt0.google.com/vt/lyrs=m@114&hl=en&src=api&x=2&y=2&z=3&s=');
    });
    it('should parse an absolute URL with an odd query string', function () {
        var parsed = decomposeUrl.parse('http://user:pass@mt0.google.com/vt/lyrs=m@114???&hl=en&src=api&x=2&y=2&z=3&s=');

        parsed.protocol.should.be.exactly('http:');
        parsed.auth.should.be.exactly('user:pass');
        parsed.hostname.should.be.exactly('mt0.google.com');
        parsed.host.should.be.exactly('mt0.google.com');
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('/vt/lyrs=m@114');
        parsed.path.should.be.exactly('/vt/lyrs=m@114???&hl=en&src=api&x=2&y=2&z=3&s=');
        parsed.search.should.be.exactly('???&hl=en&src=api&x=2&y=2&z=3&s=');
        parsed.query.should.be.exactly('??&hl=en&src=api&x=2&y=2&z=3&s=');
        (!!!parsed.hash).should.be.true;
        parsed.href.should.be.exactly('http://user:pass@mt0.google.com/vt/lyrs=m@114???&hl=en&src=api&x=2&y=2&z=3&s=');
    });
    it('should parse an absolute file protocol URL', function () {
        var parsed = decomposeUrl.parse('file://etc/passwd');

        parsed.protocol.should.be.exactly('file:');
        (!!!parsed.auth).should.be.true;
        parsed.hostname.should.be.exactly('etc');
        parsed.host.should.be.exactly('etc');
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('/passwd');
        parsed.path.should.be.exactly('/passwd');
        (!!!parsed.search).should.be.true;
        (!!!parsed.query).should.be.true;
        (!!!parsed.hash).should.be.true;
        parsed.href.should.be.exactly('file://etc/passwd');
    });
    it('should parse an absolute URL with everything', function () {
        var parsed = decomposeUrl.parse('http://user:pass@example.com:8000/foo/bar?baz=quux#frag');

        parsed.protocol.should.be.exactly('http:');
        parsed.auth.should.be.exactly('user:pass');
        parsed.hostname.should.be.exactly('example.com');
        parsed.host.should.be.exactly('example.com:8000');
        parsed.port.should.be.exactly('8000');
        parsed.pathname.should.be.exactly('/foo/bar');
        parsed.path.should.be.exactly('/foo/bar?baz=quux');
        parsed.search.should.be.exactly('?baz=quux');
        parsed.query.should.be.exactly('baz=quux');
        parsed.hash.should.be.exactly('#frag');
        parsed.href.should.be.exactly('http://user:pass@example.com:8000/foo/bar?baz=quux#frag');
    });
    it('should parse a protocol relative URL with everything', function () {
        var parsed = decomposeUrl.parse('//user:pass@example.com:8000/foo/bar?baz=quux#frag');

        (!!!parsed.protocol).should.be.true;
        parsed.auth.should.be.exactly('user:pass');
        parsed.hostname.should.be.exactly('example.com');
        parsed.host.should.be.exactly('example.com:8000');
        parsed.port.should.be.exactly('8000');
        parsed.pathname.should.be.exactly('/foo/bar');
        parsed.path.should.be.exactly('/foo/bar?baz=quux');
        parsed.search.should.be.exactly('?baz=quux');
        parsed.query.should.be.exactly('baz=quux');
        parsed.hash.should.be.exactly('#frag');
        parsed.href.should.be.exactly('//user:pass@example.com:8000/foo/bar?baz=quux#frag');
    });
    it('should parse a document relative URL with everything', function () {
        var parsed = decomposeUrl.parse('/foo/bar?baz=quux#frag');

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.auth).should.be.true;
        (!!!parsed.hostname).should.be.true;
        (!!!parsed.host).should.be.true;
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('/foo/bar');
        parsed.path.should.be.exactly('/foo/bar?baz=quux');
        parsed.search.should.be.exactly('?baz=quux');
        parsed.query.should.be.exactly('baz=quux');
        parsed.hash.should.be.exactly('#frag');
        parsed.href.should.be.exactly('/foo/bar?baz=quux#frag');
    });
    it('should parse an absolute URL with special characters', function () {
        var parsed = decomposeUrl.parse('http://bucket_name.s3.amazonaws.com/image.jpg');

        parsed.protocol.should.be.exactly('http:');
        (!!!parsed.auth).should.be.true;
        parsed.hostname.should.be.exactly('bucket_name.s3.amazonaws.com');
        parsed.host.should.be.exactly('bucket_name.s3.amazonaws.com');
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('/image.jpg');
        parsed.path.should.be.exactly('/image.jpg');
        (!!!parsed.search).should.be.true;
        (!!!parsed.query).should.be.true;
        (!!!parsed.hash).should.be.true;
        parsed.href.should.be.exactly('http://bucket_name.s3.amazonaws.com/image.jpg');
    });
    it('should parse a Git URL', function () {
        var parsed = decomposeUrl.parse('git+http://github.com/joyent/node.git');

        parsed.protocol.should.be.exactly('git+http:');
        (!!!parsed.auth).should.be.true;
        parsed.hostname.should.be.exactly('github.com');
        parsed.host.should.be.exactly('github.com');
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('/joyent/node.git');
        parsed.path.should.be.exactly('/joyent/node.git');
        (!!!parsed.search).should.be.true;
        (!!!parsed.query).should.be.true;
        (!!!parsed.hash).should.be.true;
        parsed.href.should.be.exactly('git+http://github.com/joyent/node.git');
    });
    it('should parse an URL without a host', function () {
        //While this may seem counter-intuitive, a browser will parse
        //<a href='www.google.com'> as a path.
        var parsed = decomposeUrl.parse('www.example.com');

        (!!!parsed.protocol).should.be.true;
        (!!!parsed.auth).should.be.true;
        (!!!parsed.hostname).should.be.true;
        (!!!parsed.host).should.be.true;
        (!!!parsed.port).should.be.true;
        parsed.pathname.should.be.exactly('www.example.com');
        parsed.path.should.be.exactly('www.example.com');
        (!!!parsed.search).should.be.true;
        (!!!parsed.query).should.be.true;
        (!!!parsed.hash).should.be.true;
        parsed.href.should.be.exactly('www.example.com');
    });
    it.skip('should parse an absolute URL with an empty port', function () {
        var parsed = decomposeUrl.parse('http://example.com:');

        parsed.protocol.should.be.exactly('http:');
        (!!!parsed.auth).should.be.true;
        parsed.hostname.should.be.exactly('example.com');
        parsed.host.should.be.exactly('example.com');
        (!!!parsed.port).should.be.true;
        (!!!parsed.pathname).should.be.true;
        (!!!parsed.path).should.be.true;
        (!!!parsed.search).should.be.true;
        (!!!parsed.query).should.be.true;
        (!!!parsed.hash).should.be.true;
        parsed.href.should.be.exactly('http://example.com:');
    });
});
