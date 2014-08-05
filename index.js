var simplePathRegExp = /^(\/?\/?(?!\/)[^\?#\s]*)(\?[^#\s]*)?(#[^\s]*)?$/,
    giantPattern = /^(([a-z0-9.+-]+):)?\/\/(?!\/)((.+):(.+)@)?([a-z0-9_\-\.]{0,63}|localhost(?=:|\/))?(:([0-9]*))?(.*)/i,
    queryStringPattern = /\??([^\?\=\&]+)\=?([^\=\&]+)?/g;

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
    this.tld = null;
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
            return decomposeUrl(url, str);
        } else {
            // Root Relative
            url = decomposePath(url, str);
        }
    } else if (charCode === question) {
        // Query String
        url.query = parseQueryString(str);
    } else if (charCode === octothorpe) {
        // Hash value
        url.hash = str.substring(1, str.length);
    } else if (matches = giantPattern.exec(str)) {
        // Full URL
        return decomposeUrl(url, matches);
    } else {
        // Document Relative
        url = decomposePath(url, str);
    }

    return url;
}

function decomposeUrl(url, str) {
    var matches = str;
    if (typeof matches === 'string') {
        matches = giantPattern.exec(str);
    }

    url.protocol = matches[2] || null;
    url.username = matches[4] || null;
    url.password = matches[5] || null;
    url.hostname = matches[6] || null;
    url.host = url.hostname ? url.hostname.split('.') : null;

    if (url.host && url.host.length > 1) {
        var tld = url.host && url.host.slice(url.host.length - 1)[0];
        url.tld = !isNumberic(tld) && tld;
    }

    url.port = matches[8] || '80';

    url = decompose(url, matches[9]);
    return url;
}

function decomposePath(url, str) {
    var simplePath = simplePathRegExp.exec(str);

    if (simplePath) {
        var search = simplePath[2],
            hash = simplePath[3] || null;

        url.pathname = simplePath[1];

        var path = simplePath[1].split('/');
        // Handle leading slash
        if (!path[0]) {
            path.splice(0, 1);
        }
        url.path = path;
        url.search = search;
        url = decompose(url, hash);
        url = decompose(url, search);
    }
    return url;
}

function parseQueryString(str) {
    var obj = {};

    var matches = queryStringPattern.exec(str),
        key,
        value;
    while (matches && queryStringPattern.lastIndex) {
        key = decodeURIComponent(matches[1]);
        value = decodeURIComponent(matches[2] || '');

        if (!obj.hasOwnProperty(key)) {
            obj[key] = value;
        } else if (Array.isArray(obj[key])) {
            obj[key].push(value);
        } else {
            obj[key] = [obj[key], value];
        }

        matches = queryStringPattern.exec(str);
    }
    return obj;
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

function isNumberic(str) {
    return (str - parseFloat(str) + 1) >= 0
}