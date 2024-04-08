# [PostCSS Selector Prefix](https://github.com/robkorv/postcss-selector-prefix)

[![NPM version](https://badge.fury.io/js/postcss-selector-prefix.svg)](https://npmjs.org/package/postcss-selector-prefix) [![ci](https://github.com/robkorv/postcss-selector-prefix/actions/workflows/ci.yml/badge.svg?branch=master&event=push)](https://github.com/robkorv/postcss-selector-prefix/actions/workflows/ci.yml)

[PostCSS](https://github.com/postcss/postcss) plugin to add a selector prefix to all selectors.

```css
/* Input example */
html {
  font-family: sans-serif;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}
body {
  margin: 0;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
main,
menu,
nav,
section,
summary {
  display: block;
}
```

```css
/* Output example */
#pefix {
  font-family: sans-serif;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
}
#pefix {
  margin: 0;
}
#pefix article,
#pefix aside,
#pefix details,
#pefix figcaption,
#pefix figure,
#pefix footer,
#pefix header,
#pefix hgroup,
#pefix main,
#pefix menu,
#pefix nav,
#pefix section,
#pefix summary {
  display: block;
}
```

## Usage

```js
postcss([require("postcss-selector-prefix")("#prefix")]);
```
