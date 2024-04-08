/**
 * @type {import('postcss').PluginCreator}
 */
// escape function taken from
// https://github.com/tc39/proposal-regex-escaping/blob/3d45b23af8e8824dd689deb35856a80fa52d78ca/polyfill.js
const regExpEscape = (s) => String(s).replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");

module.exports = (prefix) => {
  return {
    postcssPlugin: "postcss-selector-prefix",
    Once(root) {
      // create prefix regex.
      const escapedPrefix = regExpEscape(prefix);
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
