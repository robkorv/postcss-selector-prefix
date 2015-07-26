var postcss = require('postcss');

var plugin = postcss.plugin('postcss-selector-prefix', function (prefix) {
    return function (root) {
        root.eachRule(function (rule) {
            rule.selectors = rule.selectors.map(function(selector) {
                if (selector.includes(prefix)) {
                    return selector;
                }
                else if (selector === 'body' || selector === 'html'){
                    return prefix;
                }
                else {
                    return prefix + ' ' + selector;
                }
            });
        });
    };
});

module.exports = plugin;
