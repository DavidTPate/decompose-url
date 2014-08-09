var simplePathPattern = /^(\/?[a-z0-9-._~!$&'()*+,;=:@%\/]+)(\?([a-z0-9!$&'()*+-,;=:\[\]@\/\?%]+)?)?(#[a-z0-9!$&'()*+,;=:#-\[\]@\/\?%]+)?$/i,
    giantPattern = /^([a-z0-9\.\+-]+:)?\/\/(([a-z0-9!$&'()*+-,;=#\[\]@\/\?%]+:[a-z0-9!$&'()*+-,;=#\[\]@\/\?%]+)@)?([a-z0-9\-\._]+)(:([0-9]+))?(\/([a-z0-9-._~!$&'()*+,;=:@%\/]+)?)?(\?[a-z0-9!$&'()*+-,;=:\[\]@\/\?%]+)?(#[a-z0-9!$&'()*+,;=:#-\[\]@\/\?%]+)?$/i,
    protocolPattern = /^[a-z0-9\.\+-]+:/i,
    queryStringPartPattern = /\??([^\?\=\&]+)\=?([^\=\&]+)?/g;

var slash = 0x2F,
    question = 0x3F,
    octothorpe = 0x23,
    colon = 0x3A;

function Url() {
    this.href = null;
    this.protocol = null;
    this.slashes = null;
    this.host = null;
    this.auth = null;
    this.hostname = null;
    this.port = null;
    this.pathname = null;
    this.path = null;
    this.params = null;
    this.search = null;
    this.query = null;
    this.hash = null;
}

Url.prototype.format = function() {

    var auth = this.auth || '';
    if (auth) {
        auth = encodeURIComponent(auth);
        auth = auth.replace(/%3A/i, ':');
        auth += '@';
    }

    var protocol = this.protocol || '',
        pathname = this.pathname || '',
        hash = this.hash || '',
        host = false,
        query = '';

    if (this.host) {
        host = auth + this.host;
    } else if (this.hostname) {
        host = auth + (this.hostname.indexOf(':') === -1 ?
            this.hostname :
            '[' + this.hostname + ']');
        if (this.port) {
            host += ':' + this.port;
        }
    }

    if (this.query &&
        util.isObject(this.query) &&
        Object.keys(this.query).length) {
        query = querystring.stringify(this.query);
    }

    var search = this.search || (query && ('?' + query)) || '';

    if (protocol && protocol.substr(-1) !== ':') protocol += ':';

    // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
    // unless they had them to begin with.
    if (this.slashes ||
        (!protocol || slashedProtocol[protocol]) && host !== false) {
        host = '//' + (host || '');
        if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
    } else if (!host) {
        host = '';
    }

    if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
    if (search && search.charAt(0) !== '?') search = '?' + search;

    pathname = pathname.replace(/[?#]/g, function(match) {
        return encodeURIComponent(match);
    });
    search = search.replace('#', '%23');

    return protocol + host + pathname + search + hash;
};

Url.prototype.getPathParams = function (template) {
    return parseTemplate(this, template);
};

var shouldParseQueryString;

module.exports.parse = parse;
function parse(str, parseQueryString, slashesDenoteHost) {
    var url = new Url();

    if (!str || typeof str !== 'string') {
        return url;
    }

    url.href = str;

    shouldParseQueryString = parseQueryString;
    return decompose(url, str);
}

function decompose(url, str) {
    var charCode = str.charCodeAt(0);

    if (charCode === slash) {
        if (str.charCodeAt(1) === slash) {
            // Protocol Relative
            decomposeUrl(url, str);
        } else {
            // Root Relative
            decomposePath(url, str);
        }
    } else if (charCode === question) {
        // Query String
        decomposeQueryString(url, str);
    } else if (charCode === octothorpe) {
        // Hash value
        decomposeHash(url, str);
    } else if (protocolPattern.exec(str)) {
        // Full URL
        decomposeUrl(url, str);
    } else {
        // Document Relative
        decomposePath(url, str);
    }

    return url;
}

function decomposeUrl(url, str) {
    var matches = giantPattern.exec(str);

    if (matches) {
        url.protocol = matches[1] || null;
        if (matches[3]) {
            url.auth = decodeURIComponent(matches[3]);
        }
        url.port = matches[6] || null;
        decomposeHostname(url, matches[4]);
        decomposeQueryString(url, matches[9]);
        decomposePathname(url, matches[7]);
        decomposeHash(url, matches[10]);
    }
    return url;
}

function decomposePath(url, str) {
    var matches = simplePathPattern.exec(str);

    if (matches) {
        decomposeQueryString(url, matches[2]);
        decomposePathname(url, matches[1]);
        decomposeHash(url, matches[4]);
    }
    return url;
}

function decomposeHostname(url, str) {
    url.hostname = str;
    url.host = str + (url.port ? ':' + url.port : '');
    return url;
}

function decomposePathname(url, str) {
    url.pathname = str;

    var path = '';
    if (str) {
        path = str;
    }

    if (url.search) {
        path += url.search;
    }

    if (path) {
        url.path = path;
    }
    return url;
}

function decomposeQueryString(url, str) {
    if (!str) {
        return url;
    }

    url.search = str;
    if (shouldParseQueryString) {
        url.query = {};

        var matches = queryStringPartPattern.exec(str),
            key,
            value;
        while (matches && queryStringPartPattern.lastIndex) {
            key = decodeURIComponent(matches[1]);
            value = decodeURIComponent(matches[2] || '');

            if (!url.query.hasOwnProperty(key)) {
                url.query[key] = value;
            } else if (Array.isArray(url.query[key])) {
                url.query[key].push(value);
            } else {
                url.query[key] = [url.query[key], value];
            }

            matches = queryStringPartPattern.exec(str);
        }
    } else {
        url.query = str.substring(1);
    }
    return url;
}

function decomposeHash(url, str) {
    url.hash = str;
    return url;
}

module.exports.format = format;
function format(obj) {
    if (typeof obj === 'string') {
        obj = parse(obj);
    } else if (!(obj instanceof Url)) {
        return Url.prototype.format.call(obj);
    } else {
        return obj.format();
    }
}

module.exports.resolve = resolve;
function resolve(from, to) {
    //TODO: Implement this.
}

function parseTemplate(url, template) {
    if (!url || !url.pathname || !template || typeof template !== 'string') {
        return {};
    }

    var params = {};

    var split = template.split('/');
    // Handle leading slash
    if (!split[0]) {
        split.shift();
    }

    var paths = url.pathname.split('/');
    if (!paths[0]) {
        paths.shift();
    }

    // We can only find values for paths that are in the url
    var len = split.length < paths.length ? split.length : paths.length,
        key;
    for (var i = 0; i < len; i++) {
        key = split[i];
        if (key.charCodeAt(0) === colon) {
            key = key.substr(1);
            params[key] = paths[i];
        }
    }

    return params;
}