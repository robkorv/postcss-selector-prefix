## 4.0.0 - Node 4 support dropped, Upgrade to postcss 7, refactored code to current plugin boilerplate
* [#15](https://github.com/robkorv/postcss-selector-prefix/issues/15) main and developer dependencies upgraded to last major versions.
* Refactored code to match the current [plugin boilerplate](https://github.com/postcss/postcss-plugin-boilerplate).
* [Eslint dropped support for node 4](https://github.com/eslint/eslint/issues/10052).

## 3.0.1 - Dev dependencies update
* [#13](https://github.com/robkorv/postcss-selector-prefix/issues/13) developer dependencies updated following a vulnerability report.
* fixed links in 2.1.0 changelog lines.

## 3.0.0 - Dependencies update, node 0.12 support dropped
* dependencies update.
* [postcss 6 dropped support for node 0.12](https://github.com/postcss/postcss/releases/tag/6.0.0).

## 2.1.0 - keyframes fix and examples
* [#8](https://github.com/robkorv/postcss-selector-prefix/pull/8) don't touch `@keyframes children` (contributed by @Dangoo).
* [#9](https://github.com/robkorv/postcss-selector-prefix/issues/9) simple [example page](http://robkorv.nl/postcss-selector-prefix/).

## 2.0.0 - Combinator selector replacement, node 0.10 support dropped
* combinator selectors that can't be prefixed with the prefix are replaced with the prefix.
* dependencies update.
* [postcss 5 dropped support for node 0.10](https://github.com/postcss/postcss/releases/tag/5.0.0).

## 1.0.1 - Fix for node 0.10 & 0.12
* fixed TypeError: Object has no method 'includes'.

## 1.0.0 - Initial release
* PostCSS plugin to add a selector prefix to all selectors.

