var postcss = require('postcss')
var escapeStringRegexp = require('escape-string-regexp')

var plugin = postcss.plugin('postcss-selector-prefix', function (prefix) {
    return function (root) {
        root.walkRules(function (rule) {
            // don't touch @keyframes children
            if (rule.parent && rule.parent.name === 'keyframes') {
                return
            }
            rule.selectors = rule.selectors.map(function (selector) {
                // replace combinator selectors that can't be prefixed.
                selector = selector.replace(
                    /^html\.body\.|^html\.|^body\./, prefix + '.'
                )

                // replace descendant combinators that can't be prefixed.
                selector = selector.replace(/^body$|^html$/, prefix)

                // create prefix regex.
                var escapedPrefix = escapeStringRegexp(prefix)
                var re = new RegExp('^' + escapedPrefix) // eslint-disable-line security/detect-non-literal-regexp

                // don't prefix the already prefixed.
                if (selector.match(re)) {
                    return selector
                } else {
                    return prefix + ' ' + selector
                }
            })
        })
    }
})

module.exports = plugin
