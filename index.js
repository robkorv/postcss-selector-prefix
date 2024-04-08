/**
 * @type {import('postcss').PluginCreator}
 */
const escapeStringRegexp = require("escape-string-regexp");
module.exports = (prefix) => {
  return {
    postcssPlugin: "postcss-selector-prefix",
    Once(root) {
      // create prefix regex.
      const escapedPrefix = escapeStringRegexp(prefix);
      const re = new RegExp("^" + escapedPrefix);

      root.walkRules((rule) => {
        // don't touch @keyframes children
        if (rule.parent && rule.parent.name === "keyframes") {
          return;
        }

        rule.selectors = rule.selectors.map((selector) => {
          // replace combinator selectors that can't be prefixed.
          selector = selector.replace(
            /^html\.body\.|^html\.|^body\./,
            prefix + "."
          );

          // replace descendant combinators that can't be prefixed.
          selector = selector.replace(/^body$|^html$/, prefix);

          // don't prefix the already prefixed.
          if (selector.match(re)) {
            return selector;
          } else {
            return prefix + " " + selector;
          }
        });
      });
    },
  };
};

module.exports.postcss = true;
