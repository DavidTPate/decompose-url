var simplePathRegExp = /^(\/?[a-z0-9-._~!$&'()*+,;=:@%\/]+)(\?([a-z0-9!$&'()*+-,;=:#\[\]@\/\?%]+)?)?(#[a-z0-9!$&'()*+,;=:#-\[\]@\/\?%]+)?$/i,
    giantPattern = /^(([a-z0-9\.\+-]+):)?\/\/(([a-z0-9!$&'()*+-,;=#\[\]@\/\?%]+):([a-z0-9!$&'()*+-,;=#\[\]@\/\?%]+)@)?([a-z0-9\-\.]+)(:([0-9]+))?(\/[a-z0-9-._~!$&'()*+,;=:@%\/]+)(\?[a-z0-9!$&'()*+-,;=:#\[\]@\/\?%]+)(#[a-z0-9!$&'()*+,;=:#-\[\]@\/\?%]+)$/i,
    hostnamePartPattern = /([a-z0-9\-]+)\.?/ig,
    queryStringPartPattern = /\??([^\?\=\&]+)\=?([^\=\&]+)?/g;

var slash = 0x2F,
    question = 0x3F,
    octothorpe = 0x23,
    colon = 0x3A;

function Url() {
    this.protocol = null;
    this.username = null;
    this.password = null;
    this.hostname = null;
    this.host = null;
    this.port = null;
    this.pathname = null;
    this.path = null;
    this.params = null;
    this.search = null;
    this.query = null;
    this.hash = null;
    this.href = null;
}

module.exports = function (str, template) {
    var url = new Url();
    url.href = str;

    if (!str || typeof str !== 'string') {
        return url;
    }

    url = decompose(url, str);

    if (template) {
        return parseTemplate(url, template);
    }
    return url;
};

function decompose(url, str) {
    if (!str || typeof str !== 'string') {
        return url;
    }

    var charCode = str.charCodeAt(0),
        matches;

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
    } else if (matches = giantPattern.exec(str)) {
        // Full URL
        decomposeUrl(url, matches);
    } else {
        // Document Relative
        decomposePath(url, str);
    }

    return url;
}

function decomposeUrl(url, str) {
    var matches = str;
    if (typeof matches === 'string') {
        matches = giantPattern.exec(str);
    }

    if (matches) {
        url.protocol = matches[2] || null;
        url.username = matches[4] || null;
        url.password = matches[5] || null;
        decomposeHostname(url, matches[6]);
        url.port = matches[8] || '80';
        decomposePathname(url, matches[9]);
        decomposeQueryString(url, matches[10]);
        decomposeHash(url, matches[11]);
    }
    return url;
}

function decomposePath(url, str) {
    var matches = simplePathRegExp.exec(str);

    if (matches) {
        decomposePathname(url, matches[1]);
        decomposeQueryString(url, matches[2]);
        decomposeHash(url, matches[4]);
    }
    return url;
}

function decomposeHostname(url, str) {
    if (!str) {
        return url;
    }

    url.hostname = str;
    url.host = [];

    var matches = hostnamePartPattern.exec(str);
    while (matches && hostnamePartPattern.lastIndex) {
        if (matches[1]) {
            url.host.push(matches[1]);
        }
        matches = hostnamePartPattern.exec(str);
    }

    return url;
}

function decomposePathname(url, str) {
    url.pathname = str;
    url.path = str.split('/');
    return url;
}

function decomposeQueryString(url, str) {
    if (!str) {
        return url;
    }

    url.search = str;
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
    return url;
}

function decomposeHash(url, str) {
    url.hash = str;
    return url;
}

function parseTemplate(url, template) {
    if (!url || !url.path || !template || typeof template !== 'string') {
        return url;
    }

    url.params = {};

    var split = template.split('/');
    // Handle leading slash
    if (!split[0]) {
        split.splice(0, 1);
    }

    // We can only find values for paths that are in the url
    var len = split.length < url.path.length ? split.length : url.path.length,
        key;
    for (var i = 0; i < len; i++) {
        key = split[i];
        if (key.charCodeAt(0) === colon) {
            key = key.substr(1);
            url.params[key] = url.path[i];
        }
    }

    return url;
}