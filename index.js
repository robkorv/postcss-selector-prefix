'use strict';
const postcss = require('postcss');
const escapeStringRegexp = require('escape-string-regexp');

let plugin = postcss.plugin('postcss-selector-prefix', (prefix) => {
    return (root) => {
        root.walkRules((rule) => {
            // don't touch @keyframes children
            if (rule.parent && rule.parent.name === 'keyframes') {
                return;
            }
            rule.selectors = rule.selectors.map((selector) => {
                // replace combinator selectors that can't be prefixed.
                selector = selector.replace(
                    /^html\.body\.|^html\.|^body\./, prefix + '.'
                );

                // replace descendant combinators that can't be prefixed.
                selector = selector.replace(/^body$|^html$/, prefix);

                // create prefix regex.
                let escapedPrefix = escapeStringRegexp(prefix);
                let re = new RegExp('^' + escapedPrefix);

                // don't prefix the already prefixed.
                if (selector.match(re)) {
                    return selector;
                } else {
                    return prefix + ' ' + selector;
                }
            });
        });
    };
});

module.exports = plugin;
