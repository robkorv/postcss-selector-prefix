# PostCSS Selector Prefix
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

[PostCSS] plugin to add a selector prefix to all selectors.


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
postcss([ require('postcss-selector-prefix')('#prefix') ])
```

[npm-image]: https://badge.fury.io/js/postcss-selector-prefix.svg
[npm-url]: https://npmjs.org/package/postcss-selector-prefix
[travis-image]: https://travis-ci.org/robkorv/postcss-selector-prefix.svg?branch=master
[travis-url]: https://travis-ci.org/robkorv/postcss-selector-prefix
[daviddm-image]: https://david-dm.org/robkorv/postcss-selector-prefix.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/robkorv/postcss-selector-prefix
[PostCSS]: https://github.com/postcss/postcss
