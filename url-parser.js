!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.urlParser=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var simplePathRegExp = /^(\/?\/?(?!\/)[^\?#\s]*)(\?[^#\s]*)?(#[^\s]*)?$/,
    protocolPattern = /^([a-z0-9.+-]+:)?(\/\/(?!\/))/i,
    hostPattern = /^[a-z0-9_\-\.]{0,63}\.[a-z]+(?=:|\/)/i,
    authPattern = /^([a-z0-9_\-]+):([a-z0-9_\-]+)@/i,
    portPattern = /^:([0-9]*)/,
    separator = '&',
    equals = '=',
    colon = ':';

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

module.exports.parse = function (url, template) {
    var parsedUrl = parse(url);

    if (template) {
        return parseTemplate(parsedUrl, template);
    }
    return parsedUrl;
};

function parse(str) {
    var url = new Url();
    if (!str || typeof str !== 'string') {
        return url;
    }

    var simplePath = typeof str === 'string' && simplePathRegExp.exec(str);

    if (simplePath) {
        var search = simplePath[2] ? simplePath[2].substr(1) : null,
            hash = simplePath[3] || null;

        var parsed = simplePath[1],
            protocol = protocolPattern.exec(parsed);

        if (protocol) {
            url.protocol = protocol[1] && protocol[1].substr(0, protocol[1].length - 1);
            parsed = parsed.substr(protocol[0].length);

            var auth = authPattern.exec(parsed);
            if (auth) {
                url.username = auth[1];
                url.password = auth[2];
                parsed = parsed.substr(auth[0].length);
            }

            var host = hostPattern.exec(parsed);
            url.hostname = host[0];
            url.host = host[0].split('.');
            // Remove the TLD
            url.tld = url.host[url.host.length - 1];
            url.host.splice(url.host.length - 1);
            parsed = parsed.substr(host[0].length);

            var port = portPattern.exec(parsed);
            if (port) {
                url.port = port[1];
                parsed = parsed.substr(port[0].length);
            } else {
                url.port = '80';
            }
        }

        url.pathname = parsed;

        var path = parsed.split('/');
        // Handle leading slash
        if (!path[0]) {
            path.splice(0, 1);
        }
        url.path = path;
        url.href = str;
        url.search = search;
        url.hash = hash && hash.substr(1);
        url.query = parseQueryString(search);
    }

    return url;
}

function parseQueryString(str) {
    if (!str || typeof str !== 'string') {
        return null;
    }

    var spacesRegExp = /\+/g,
        obj = {},
        qs = str.split(separator),
        len = qs.length,
        pair,
        equalsIndex,
        key,
        value;

    for (var i = 0; i < len; i++) {
        pair = qs[i].replace(spacesRegExp, '%20');
        equalsIndex = pair.indexOf(equals);

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
        if (key[0] === colon) {
            key = key.substr(1);
            url.params[key] = url.path[i];
        }
    }

    return url;
}
},{}]},{},[1])(1)
});