var simplePathPattern = /^(\/?[a-z0-9-._~!$&'()*+,;=:@%\/]+)(\?([a-z0-9!$&'()*+-,;=:#\[\]@\/\?%]+)?)?(#[a-z0-9!$&'()*+,;=:#-\[\]@\/\?%]+)?$/i,
    giantPattern = /^([a-z0-9\.\+-]+:)?\/\/(([a-z0-9!$&'()*+-,;=#\[\]@\/\?%]+:[a-z0-9!$&'()*+-,;=#\[\]@\/\?%]+)@)?([a-z0-9\-\.]+)(:([0-9]+))?(\/[a-z0-9-._~!$&'()*+,;=:@%\/]+)(\?[a-z0-9!$&'()*+-,;=:#\[\]@\/\?%]+)(#[a-z0-9!$&'()*+,;=:#-\[\]@\/\?%]+)$/i,
    protocolPattern = /^[a-z0-9\.\+-]+:/,
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

Url.prototype.getPathParams = function (template) {
    return parseTemplate(this, template);
};

var shouldParseQueryString;

module.exports.parse = parse;
function parse(str, parseQueryString, slashesDenoteHost) {
    var url = new Url();
    url.href = str;

    if (!str || typeof str !== 'string') {
        return url;
    }

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
        url.auth = matches[3] || null;
        url.port = matches[6] || null;
        decomposeHostname(url, matches[4]);
        decomposeQueryString(url, matches[8]);
        decomposePathname(url, matches[7]);
        decomposeHash(url, matches[9]);
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
    url.path = str + (url.search ? url.search : '');
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
    //TODO: Implement this.
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