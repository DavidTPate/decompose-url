var parseTestsWithQueryString = {
    '/foo/bar?baz=quux#frag' : {
        'href': '/foo/bar?baz=quux#frag',
        'hash': '#frag',
        'search': '?baz=quux',
        'query': {
            'baz': 'quux'
        },
        'pathname': '/foo/bar',
        'path': '/foo/bar?baz=quux'
    },
    'http://example.com' : {
        'href': 'http://example.com/',
        'protocol': 'http:',
        'slashes': true,
        'host': 'example.com',
        'hostname': 'example.com',
        'query': {},
        'search': '',
        'pathname': '/',
        'path': '/'
    },
    '/example': {
        protocol: null,
        slashes: null,
        auth: null,
        host: null,
        port: null,
        hostname: null,
        hash: null,
        search: '',
        query: {},
        pathname: '/example',
        path: '/example',
        href: '/example'
    },
    '/example?query=value':{
        protocol: null,
        slashes: null,
        auth: null,
        host: null,
        port: null,
        hostname: null,
        hash: null,
        search: '?query=value',
        query: { query: 'value' },
        pathname: '/example',
        path: '/example?query=value',
        href: '/example?query=value'
    }
};