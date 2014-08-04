var simplePathRegExp = /^(\/?\/?(?!\/)[^\?#\s]*)(\?[^#\s]*)?(#[^\s]*)?$/,
    protocolPattern = /^(([a-z0-9.+-]+):)?\/\/(?!\/)(.*)/i,
    hostPattern = /^[a-z0-9_\-\.]{0,63}\.[a-z]+|localhost(?=:|\/)/i,
    authPattern = /^([a-z0-9_\-]+):([a-z0-9_\-]+)@/i,
    portPattern = /^:([0-9]*)/,
    giantPattern = /^(([a-z0-9.+-]+):)?\/\/(?!\/)((.+):(.+)@)?([a-z0-9_\-\.]{0,63}\.[a-z]+|localhost(?=:|\/))?(:([0-9]*))?(.*)/i;

var slash = 0x2F,
    question = 0x3F,
    octothorpe = 0x23,
    ampersand = 0x26,
    colon = 0x3A,
    equals = 0x3D,
    equalsSymbol = '=',
    querySeparator = '&';

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
    } else if(matches = giantPattern.exec(str)) {
        // Full URL
        return decomposeUrl(url, matches);
    } else {
        // Document Relative
        url = decomposePath(url, str);
    }

    return url;
}

function decomposeUrl(url, str) {
    if (!str) {
        return url;
    }

    var matches = str;
    if (typeof matches === 'string') {
        matches = giantPattern.exec(str);
    }

    if (matches) {
        url.protocol = matches[2] || null;
        url.username = matches[4] || null;
        url.password = matches[5] || null;
        url.hostname = matches[6] || null;
        url.host = url.hostname ? url.hostname.split('.') : null;

        if (url.host.length > 1) {
            url.tld = url.host ? url.host.slice(url.host.length - 1)[0] : null;
        }

        url.port = matches[8] || '80';

        url = decompose(url, matches[9]);
    }
    return url;
}

function decomposePath(url, str) {
    if (!str) {
        return url;
    }

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
    //TODO: Improve speed of query string processing. This is making the difference between 1.3 million ops/sec and 237k ops/sec.
    if (typeof str !== 'string') {
        return null;
    }

    if (str.charCodeAt(0) === question) {
        str = str.substring(1, str.length);
    }

    if (!str) {
        return null;
    }

    var spacesRegExp = /\+/g,
        obj = {},
        qs = str.split(querySeparator),
        len = qs.length,
        pair,
        equalsIndex,
        key,
        value;

    for (var i = 0; i < len; i++) {
        pair = qs[i].replace(spacesRegExp, '%20');
        equalsIndex = pair.indexOf(equalsSymbol);

        if (equalsIndex >= 0) {
            key = pair.substr(0, equalsIndex);
            value = pair.substr(equalsIndex + 1);
        } else {
            key = pair;
            value = '';
        }

        key = decodeURIComponent(key);
        value = decodeURIComponent(value);

        if (!obj.hasOwnProperty(key)) {
            obj[key] = value;
        } else if (Array.isArray(obj[key])) {
            obj[key].push(value);
        } else {
            obj[key] = [obj[key], value];
        }
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