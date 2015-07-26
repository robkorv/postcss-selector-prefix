# PostCSS Selector Prefix [![Build Status][ci-img]][ci]

[PostCSS] plugin to add a selector prefix to all selectors.

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/robkorv/postcss-selector-prefix.svg
[ci]:      https://travis-ci.org/robkorv/postcss-selector-prefix

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
}
```

## Usage

```js
postcss([ require('postcss-selector-prefix')('#prefix') ])
```
