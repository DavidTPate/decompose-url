//http://user:pass@host.com:8080/p/a/t/h?query=string#hash

(function (assert, lib) {
    describe.only('decopose-url.parse(url)', function () {
        var urlsToTest = {
            'http://user:pass@host.com:8080/p/a/t/h?query=string#hash': {
                href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash',
                protocol: 'http:',
                slashes: true,
                host: 'host.com:8080',
                auth: 'user:pass',
                hostname: 'host.com',
                port: '8080',
                pathname: '/p/a/t/h',
                search: '?query=string',
                path: '/p/a/t/h?query=string',
                query: 'query=string',
                hash: '#hash'
            },
            '//some_path': {
                href: '//some_path',
                host: 'some_path',
                hostname: 'some_path'
            },
            'http:\\\\evil-phisher\\foo.html#h\\a\\s\\h': {
                protocol: null,
                slashes: null,
                host: null,
                hostname: null,
                pathname: null,
                path: null,
                hash: null,
                href: null
            },
            'HTTP://www.example.com/': {
                href: 'HTTP://www.example.com/',
                protocol: 'HTTP:',
                slashes: true,
                host: 'www.example.com',
                hostname: 'www.example.com',
                pathname: '/',
                path: '/'
            },
            'HTTP://www.example.com': {
                href: 'HTTP://www.example.com',
                protocol: 'HTTP:',
                slashes: true,
                host: 'www.example.com',
                hostname: 'www.example.com',
                pathname: undefined,
                path: undefined
            },
            'http://www.ExAmPlE.com/': {
                href: 'http://www.ExAmPlE.com/',
                protocol: 'http:',
                slashes: true,
                host: 'www.ExAmPlE.com',
                hostname: 'www.ExAmPlE.com',
                pathname: '/',
                path: '/'
            },
            'http://user:pw@www.ExAmPlE.com/': {
                href: 'http://user:pw@www.ExAmPlE.com/',
                protocol: 'http:',
                slashes: true,
                auth: 'user:pw',
                host: 'www.ExAmPlE.com',
                hostname: 'www.ExAmPlE.com',
                pathname: '/',
                path: '/'
            },
            'http://USER:PW@www.ExAmPlE.com/': {
                href: 'http://USER:PW@www.ExAmPlE.com/',
                protocol: 'http:',
                slashes: true,
                auth: 'USER:PW',
                host: 'www.ExAmPlE.com',
                hostname: 'www.ExAmPlE.com',
                pathname: '/',
                path: '/'
            },
            'http://user@www.example.com/': {
                href: 'http://user@www.example.com/',
                protocol: 'http:',
                slashes: true,
                auth: 'user',
                host: 'www.example.com',
                hostname: 'www.example.com',
                pathname: '/',
                path: '/'
            },
            'http://user%3Apw@www.example.com/': {
                href: 'http://user%3Apw@www.example.com/',
                protocol: 'http:',
                slashes: true,
                auth: 'user%3Apw',
                host: 'www.example.com',
                hostname: 'www.example.com',
                pathname: '/',
                path: '/'
            },
            'http://x.com/path?that\'s#all, folks': {
                href: null,
                protocol: null,
                slashes: null,
                host: null,
                hostname: null,
                search: null,
                query: null,
                pathname: null,
                hash: null,
                path: null
            },
            'HTTP://X.COM/Y': {
                href: 'HTTP://X.COM/Y',
                protocol: 'HTTP:',
                slashes: true,
                host: 'X.COM',
                hostname: 'X.COM',
                pathname: '/Y',
                path: '/Y'
            },
            // an unexpected invalid char in the hostname.
            'HtTp://x.y.cOm*a/b/c?d=e#f g<h>i': {
                href: 'http://x.y.com/*a/b/c?d=e#f%20g%3Ch%3Ei',
                protocol: 'http:',
                slashes: true,
                host: 'x.y.com',
                hostname: 'x.y.com',
                pathname: '/*a/b/c',
                search: '?d=e',
                query: 'd=e',
                hash: '#f%20g%3Ch%3Ei',
                path: '/*a/b/c?d=e'
            },
            // make sure that we don't accidentally lcast the path parts.
            'HtTp://x.y.cOm*A/b/c?d=e#f g<h>i': {
                href: 'http://x.y.com/*A/b/c?d=e#f%20g%3Ch%3Ei',
                protocol: 'http:',
                slashes: true,
                host: 'x.y.com',
                hostname: 'x.y.com',
                pathname: '/*A/b/c',
                search: '?d=e',
                query: 'd=e',
                hash: '#f%20g%3Ch%3Ei',
                path: '/*A/b/c?d=e'
            },
            'http://x...y...#p': {
                href: 'http://x...y...#p',
                protocol: 'http:',
                slashes: true,
                host: 'x...y...',
                hostname: 'x...y...',
                hash: '#p',
                pathname: '/',
                path: '/'
            },
            'http://x/p/"quoted"': {
                href: 'http://x/p/%22quoted%22',
                protocol: 'http:',
                slashes: true,
                host: 'x',
                hostname: 'x',
                pathname: '/p/%22quoted%22',
                path: '/p/%22quoted%22'
            },
            '<http://goo.corn/bread> Is a URL!': {
                href: '%3Chttp://goo.corn/bread%3E%20Is%20a%20URL!',
                pathname: '%3Chttp://goo.corn/bread%3E%20Is%20a%20URL!',
                path: '%3Chttp://goo.corn/bread%3E%20Is%20a%20URL!'
            },
            'http://www.narwhaljs.org/blog/categories?id=news': {
                href: 'http://www.narwhaljs.org/blog/categories?id=news',
                protocol: 'http:',
                slashes: true,
                host: 'www.narwhaljs.org',
                hostname: 'www.narwhaljs.org',
                search: '?id=news',
                query: 'id=news',
                pathname: '/blog/categories',
                path: '/blog/categories?id=news'
            },
            'http://mt0.google.com/vt/lyrs=m@114&hl=en&src=api&x=2&y=2&z=3&s=': {
                href: 'http://mt0.google.com/vt/lyrs=m@114&hl=en&src=api&x=2&y=2&z=3&s=',
                protocol: 'http:',
                slashes: true,
                host: 'mt0.google.com',
                hostname: 'mt0.google.com',
                pathname: '/vt/lyrs=m@114&hl=en&src=api&x=2&y=2&z=3&s=',
                path: '/vt/lyrs=m@114&hl=en&src=api&x=2&y=2&z=3&s='
            },
            'http://mt0.google.com/vt/lyrs=m@114???&hl=en&src=api&x=2&y=2&z=3&s=': {
                href: 'http://mt0.google.com/vt/lyrs=m@114???&hl=en&src=api' +
                      '&x=2&y=2&z=3&s=',
                protocol: 'http:',
                slashes: true,
                host: 'mt0.google.com',
                hostname: 'mt0.google.com',
                search: '???&hl=en&src=api&x=2&y=2&z=3&s=',
                query: '??&hl=en&src=api&x=2&y=2&z=3&s=',
                pathname: '/vt/lyrs=m@114',
                path: '/vt/lyrs=m@114???&hl=en&src=api&x=2&y=2&z=3&s='
            },
            'http://user:pass@mt0.google.com/vt/lyrs=m@114???&hl=en&src=api&x=2&y=2&z=3&s=': {
                href: 'http://user:pass@mt0.google.com/vt/lyrs=m@114???' +
                      '&hl=en&src=api&x=2&y=2&z=3&s=',
                protocol: 'http:',
                slashes: true,
                host: 'mt0.google.com',
                auth: 'user:pass',
                hostname: 'mt0.google.com',
                search: '???&hl=en&src=api&x=2&y=2&z=3&s=',
                query: '??&hl=en&src=api&x=2&y=2&z=3&s=',
                pathname: '/vt/lyrs=m@114',
                path: '/vt/lyrs=m@114???&hl=en&src=api&x=2&y=2&z=3&s='
            },
            //TODO: This should be properly recognized as it is valid.
            'file:///etc/passwd': {
                href: 'file:///etc/passwd',
                slashes: true,
                protocol: 'file:',
                pathname: '/etc/passwd',
                hostname: '',
                host: '',
                path: '/etc/passwd'
            },
            'file://localhost/etc/passwd': {
                href: 'file://localhost/etc/passwd',
                protocol: 'file:',
                slashes: true,
                pathname: '/etc/passwd',
                hostname: 'localhost',
                host: 'localhost',
                path: '/etc/passwd'
            },
            'file://foo/etc/passwd': {
                href: 'file://foo/etc/passwd',
                protocol: 'file:',
                slashes: true,
                pathname: '/etc/passwd',
                hostname: 'foo',
                host: 'foo',
                path: '/etc/passwd'
            },
            'file:///etc/node/': {
                href: 'file:///etc/node/',
                slashes: true,
                protocol: 'file:',
                pathname: '/etc/node/',
                hostname: '',
                host: '',
                path: '/etc/node/'
            },
            'file://localhost/etc/node/': {
                href: 'file://localhost/etc/node/',
                protocol: 'file:',
                slashes: true,
                pathname: '/etc/node/',
                hostname: 'localhost',
                host: 'localhost',
                path: '/etc/node/'
            },
            'file://foo/etc/node/': {
                href: 'file://foo/etc/node/',
                protocol: 'file:',
                slashes: true,
                pathname: '/etc/node/',
                hostname: 'foo',
                host: 'foo',
                path: '/etc/node/'
            },
            'http:/baz/../foo/bar': {
                href: 'http:/baz/../foo/bar',
                protocol: 'http:',
                pathname: '/baz/../foo/bar',
                path: '/baz/../foo/bar'
            },
            'http://user:pass@example.com:8000/foo/bar?baz=quux#frag': {
                href: 'http://user:pass@example.com:8000/foo/bar?baz=quux#frag',
                protocol: 'http:',
                slashes: true,
                host: 'example.com:8000',
                auth: 'user:pass',
                port: '8000',
                hostname: 'example.com',
                hash: '#frag',
                search: '?baz=quux',
                query: 'baz=quux',
                pathname: '/foo/bar',
                path: '/foo/bar?baz=quux'
            },
            '//user:pass@example.com:8000/foo/bar?baz=quux#frag': {
                href: '//user:pass@example.com:8000/foo/bar?baz=quux#frag',
                slashes: true,
                host: 'example.com:8000',
                auth: 'user:pass',
                port: '8000',
                hostname: 'example.com',
                hash: '#frag',
                search: '?baz=quux',
                query: 'baz=quux',
                pathname: '/foo/bar',
                path: '/foo/bar?baz=quux'
            },
            '/foo/bar?baz=quux#frag': {
                href: '/foo/bar?baz=quux#frag',
                hash: '#frag',
                search: '?baz=quux',
                query: 'baz=quux',
                pathname: '/foo/bar',
                path: '/foo/bar?baz=quux'
            },
            'http:/foo/bar?baz=quux#frag': {
                href: 'http:/foo/bar?baz=quux#frag',
                protocol: 'http:',
                hash: '#frag',
                search: '?baz=quux',
                query: 'baz=quux',
                pathname: '/foo/bar',
                path: '/foo/bar?baz=quux'
            },
            'mailto:foo@bar.com?subject=hello': {
                href: 'mailto:foo@bar.com?subject=hello',
                protocol: 'mailto:',
                host: 'bar.com',
                auth: 'foo',
                hostname: 'bar.com',
                search: '?subject=hello',
                query: 'subject=hello',
                path: undefined
            },
            'javascript:alert(\'hello\');': {
                href: 'javascript:alert(\'hello\');',
                protocol: 'javascript:',
                hostname: 'alert(\'hello\');',
                host: 'alert(\'hello\');'
            },
            'xmpp:isaacschlueter@jabber.org': {
                href: 'xmpp:isaacschlueter@jabber.org',
                protocol: 'xmpp:',
                host: 'jabber.org',
                auth: 'isaacschlueter',
                hostname: 'jabber.org'
            },
            'http://atpass:foo%40bar@127.0.0.1:8080/path?search=foo#bar': {
                href: 'http://atpass:foo%40bar@127.0.0.1:8080/path?search=foo#bar',
                protocol: 'http:',
                slashes: true,
                host: '127.0.0.1:8080',
                auth: 'atpass:foo%40bar',
                hostname: '127.0.0.1',
                port: '8080',
                pathname: '/path',
                search: '?search=foo',
                query: 'search=foo',
                hash: '#bar',
                path: '/path?search=foo'
            },
            'svn+ssh://foo/bar': {
                href: 'svn+ssh://foo/bar',
                host: 'foo',
                hostname: 'foo',
                protocol: 'svn+ssh:',
                pathname: '/bar',
                path: '/bar',
                slashes: true
            },
            'dash-test://foo/bar': {
                href: 'dash-test://foo/bar',
                host: 'foo',
                hostname: 'foo',
                protocol: 'dash-test:',
                pathname: '/bar',
                path: '/bar',
                slashes: true
            },
            'dash-test:foo/bar': {
                href: 'dash-test:foo/bar',
                host: 'foo',
                hostname: 'foo',
                protocol: 'dash-test:',
                pathname: '/bar',
                path: '/bar'
            },
            'dot.test://foo/bar': {
                href: 'dot.test://foo/bar',
                host: 'foo',
                hostname: 'foo',
                protocol: 'dot.test:',
                pathname: '/bar',
                path: '/bar',
                slashes: true
            },
            'dot.test:foo/bar': {
                href: 'dot.test:foo/bar',
                host: 'foo',
                hostname: 'foo',
                protocol: 'dot.test:',
                pathname: '/bar',
                path: '/bar'
            },
            // IDNA tests
            'http://www.日本語.com/': {
                href: 'http://www.xn--wgv71a119e.com/',
                protocol: 'http:',
                slashes: true,
                host: 'www.xn--wgv71a119e.com',
                hostname: 'www.xn--wgv71a119e.com',
                pathname: '/',
                path: '/'
            },
            'http://example.Bücher.com/': {
                href: 'http://example.xn--bcher-kva.com/',
                protocol: 'http:',
                slashes: true,
                host: 'example.xn--bcher-kva.com',
                hostname: 'example.xn--bcher-kva.com',
                pathname: '/',
                path: '/'
            },
            'http://www.Äffchen.com/': {
                href: 'http://www.xn--ffchen-9ta.com/',
                protocol: 'http:',
                slashes: true,
                host: 'www.xn--ffchen-9ta.com',
                hostname: 'www.xn--ffchen-9ta.com',
                pathname: '/',
                path: '/'
            },
            'http://www.Äffchen.cOm*A/b/c?d=e#f g<h>i': {
                href: 'http://www.xn--ffchen-9ta.com/*A/b/c?d=e#f%20g%3Ch%3Ei',
                protocol: 'http:',
                slashes: true,
                host: 'www.xn--ffchen-9ta.com',
                hostname: 'www.xn--ffchen-9ta.com',
                pathname: '/*A/b/c',
                search: '?d=e',
                query: 'd=e',
                hash: '#f%20g%3Ch%3Ei',
                path: '/*A/b/c?d=e'
            },
            'http://SÉLIER.COM/': {
                href: 'http://xn--slier-bsa.com/',
                protocol: 'http:',
                slashes: true,
                host: 'xn--slier-bsa.com',
                hostname: 'xn--slier-bsa.com',
                pathname: '/',
                path: '/'
            },
            'http://ليهمابتكلموشعربي؟.ي؟/': {
                href: 'http://xn--egbpdaj6bu4bxfgehfvwxn.xn--egb9f/',
                protocol: 'http:',
                slashes: true,
                host: 'xn--egbpdaj6bu4bxfgehfvwxn.xn--egb9f',
                hostname: 'xn--egbpdaj6bu4bxfgehfvwxn.xn--egb9f',
                pathname: '/',
                path: '/'
            },
            'http://➡.ws/➡': {
                href: 'http://xn--hgi.ws/➡',
                protocol: 'http:',
                slashes: true,
                host: 'xn--hgi.ws',
                hostname: 'xn--hgi.ws',
                pathname: '/➡',
                path: '/➡'
            },
            'http://bucket_name.s3.amazonaws.com/image.jpg': {
                protocol: 'http:',
                slashes: true,
                host: 'bucket_name.s3.amazonaws.com',
                hostname: 'bucket_name.s3.amazonaws.com',
                pathname: '/image.jpg',
                href: 'http://bucket_name.s3.amazonaws.com/image.jpg',
                path: '/image.jpg'
            },
            'git+http://github.com/joyent/node.git': {
                protocol: 'git+http:',
                slashes: true,
                host: 'github.com',
                hostname: 'github.com',
                pathname: '/joyent/node.git',
                path: '/joyent/node.git',
                href: 'git+http://github.com/joyent/node.git'
            },
            //if local1@domain1 is uses as a relative URL it may
            //be parse into auth@hostname, but here there is no
            //way to make it work in url.parse, I add the test to be explicit
            'local1@domain1': {
                pathname: 'local1@domain1',
                path: 'local1@domain1',
                href: 'local1@domain1'
            },

            //While this may seem counter-intuitive, a browser will parse
            //<a href='www.google.com'> as a path.
            'www.example.com': {
                href: 'www.example.com',
                pathname: 'www.example.com',
                path: 'www.example.com'
            },

            // ipv6 support
            '[fe80::1]': {
                href: '[fe80::1]',
                pathname: '[fe80::1]',
                path: '[fe80::1]'
            },
            'coap://[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]': {
                protocol: 'coap:',
                slashes: true,
                host: '[fedc:ba98:7654:3210:fedc:ba98:7654:3210]',
                hostname: 'fedc:ba98:7654:3210:fedc:ba98:7654:3210',
                href: 'coap://[fedc:ba98:7654:3210:fedc:ba98:7654:3210]/',
                pathname: '/',
                path: '/'
            },
            'coap://[1080:0:0:0:8:800:200C:417A]:61616/': {
                protocol: 'coap:',
                slashes: true,
                host: '[1080:0:0:0:8:800:200c:417a]:61616',
                port: '61616',
                hostname: '1080:0:0:0:8:800:200c:417a',
                href: 'coap://[1080:0:0:0:8:800:200c:417a]:61616/',
                pathname: '/',
                path: '/'
            },
            'http://user:password@[3ffe:2a00:100:7031::1]:8080': {
                protocol: 'http:',
                slashes: true,
                auth: 'user:password',
                host: '[3ffe:2a00:100:7031::1]:8080',
                port: '8080',
                hostname: '3ffe:2a00:100:7031::1',
                href: 'http://user:password@[3ffe:2a00:100:7031::1]:8080/',
                pathname: '/',
                path: '/'
            },
            'coap://u:p@[::192.9.5.5]:61616/.well-known/r?n=Temperature': {
                protocol: 'coap:',
                slashes: true,
                auth: 'u:p',
                host: '[::192.9.5.5]:61616',
                port: '61616',
                hostname: '::192.9.5.5',
                href: 'coap://u:p@[::192.9.5.5]:61616/.well-known/r?n=Temperature',
                search: '?n=Temperature',
                query: 'n=Temperature',
                pathname: '/.well-known/r',
                path: '/.well-known/r?n=Temperature'
            },
            'http://example.com:': {
                protocol: 'http:',
                slashes: true,
                host: 'example.com',
                hostname: 'example.com',
                href: 'http://example.com/',
                pathname: '/',
                path: '/'
            },
            'http://example.com:/a/b.html': {
                protocol: 'http:',
                slashes: true,
                host: 'example.com',
                hostname: 'example.com',
                href: 'http://example.com/a/b.html',
                pathname: '/a/b.html',
                path: '/a/b.html'
            },
            'http://example.com:?a=b': {
                protocol: 'http:',
                slashes: true,
                host: 'example.com',
                hostname: 'example.com',
                href: 'http://example.com/?a=b',
                search: '?a=b',
                query: 'a=b',
                pathname: '/',
                path: '/?a=b'
            },
            'http://example.com:#abc': {
                protocol: 'http:',
                slashes: true,
                host: 'example.com',
                hostname: 'example.com',
                href: 'http://example.com/#abc',
                hash: '#abc',
                pathname: '/',
                path: '/'
            },
            'http://[fe80::1]/a/b?a=b#abc': {
                protocol: 'http:',
                slashes: true,
                host: '[fe80::1]',
                hostname: '[fe80::1]',
                href: 'http://[fe80::1]/a/b?a=b#abc',
                search: '?a=b',
                query: 'a=b',
                hash: '#abc',
                pathname: '/a/b',
                path: '/a/b?a=b'
            },
            'http://-lovemonsterz.tumblr.com/rss': {
                protocol: 'http:',
                slashes: true,
                host: '-lovemonsterz.tumblr.com',
                hostname: '-lovemonsterz.tumblr.com',
                href: 'http://-lovemonsterz.tumblr.com/rss',
                pathname: '/rss',
                path: '/rss'
            },
            'http://-lovemonsterz.tumblr.com:80/rss': {
                protocol: 'http:',
                slashes: true,
                port: '80',
                host: '-lovemonsterz.tumblr.com:80',
                hostname: '-lovemonsterz.tumblr.com',
                href: 'http://-lovemonsterz.tumblr.com:80/rss',
                pathname: '/rss',
                path: '/rss'
            },
            'http://user:pass@-lovemonsterz.tumblr.com/rss': {
                protocol: 'http:',
                slashes: true,
                auth: 'user:pass',
                host: '-lovemonsterz.tumblr.com',
                hostname: '-lovemonsterz.tumblr.com',
                href: 'http://user:pass@-lovemonsterz.tumblr.com/rss',
                pathname: '/rss',
                path: '/rss'
            },
            'http://user:pass@-lovemonsterz.tumblr.com:80/rss': {
                protocol: 'http:',
                slashes: true,
                auth: 'user:pass',
                port: '80',
                host: '-lovemonsterz.tumblr.com:80',
                hostname: '-lovemonsterz.tumblr.com',
                href: 'http://user:pass@-lovemonsterz.tumblr.com:80/rss',
                pathname: '/rss',
                path: '/rss'
            },
            'http://_jabber._tcp.google.com/test': {
                protocol: 'http:',
                slashes: true,
                host: '_jabber._tcp.google.com',
                hostname: '_jabber._tcp.google.com',
                href: 'http://_jabber._tcp.google.com/test',
                pathname: '/test',
                path: '/test'
            },
            'http://user:pass@_jabber._tcp.google.com/test': {
                protocol: 'http:',
                slashes: true,
                auth: 'user:pass',
                host: '_jabber._tcp.google.com',
                hostname: '_jabber._tcp.google.com',
                href: 'http://user:pass@_jabber._tcp.google.com/test',
                pathname: '/test',
                path: '/test'
            },
            'http://_jabber._tcp.google.com:80/test': {
                protocol: 'http:',
                slashes: true,
                port: '80',
                host: '_jabber._tcp.google.com:80',
                hostname: '_jabber._tcp.google.com',
                href: 'http://_jabber._tcp.google.com:80/test',
                pathname: '/test',
                path: '/test'
            },
            'http://user:pass@_jabber._tcp.google.com:80/test': {
                protocol: 'http:',
                slashes: true,
                auth: 'user:pass',
                port: '80',
                host: '_jabber._tcp.google.com:80',
                hostname: '_jabber._tcp.google.com',
                href: 'http://user:pass@_jabber._tcp.google.com:80/test',
                pathname: '/test',
                path: '/test'
            },
            'http://x:1/\' <>"`/{}|\\^~`/': {
                protocol: 'http:',
                slashes: true,
                host: 'x:1',
                port: '1',
                hostname: 'x',
                pathname: '/%27%20%3C%3E%22%60/%7B%7D%7C/%5E~%60/',
                path: '/%27%20%3C%3E%22%60/%7B%7D%7C/%5E~%60/',
                href: 'http://x:1/%27%20%3C%3E%22%60/%7B%7D%7C/%5E~%60/'
            },
            'http://a@b@c/': {
                protocol: 'http:',
                slashes: true,
                auth: 'a@b',
                host: 'c',
                hostname: 'c',
                href: 'http://a%40b@c/',
                path: '/',
                pathname: '/'
            },
            'http://a@b?@c': {
                protocol: 'http:',
                slashes: true,
                auth: 'a',
                host: 'b',
                hostname: 'b',
                href: 'http://a@b/?@c',
                path: '/?@c',
                pathname: '/',
                search: '?@c',
                query: '@c'
            },
            'http://a\r" \t\n<\'b:b@c\r\nd/e?f': {
                protocol: 'http:',
                slashes: true,
                auth: 'a\r" \t\n<\'b:b',
                host: 'c',
                port: null,
                hostname: 'c',
                hash: null,
                search: '?f',
                query: 'f',
                pathname: '%0D%0Ad/e',
                path: '%0D%0Ad/e?f',
                href: 'http://a%0D%22%20%09%0A%3C\'b:b@c/%0D%0Ad/e?f'
            }
        };

        Object.keys(urlsToTest).forEach(function (key) {
            it('Should be able to parse ' + key, function () {
                var parsed = lib.parse(key),
                    test = urlsToTest[key];

                Object.keys(test).forEach(function (testKey) {
                    assert.that(parsed[testKey], is.equalTo(test[testKey]));
                });
            });
        });
    });
}(require('node-assertthat'), require('../')));