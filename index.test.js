const postcss = require("postcss");
const { equal } = require("node:assert");
const { test } = require("node:test");

const plugin = require("./");

async function run(input, output, prefix) {
  let result = await postcss([plugin(prefix)]).process(input, {
    from: undefined,
  });
  equal(result.css, output);
  equal(result.warnings().length, 0);
}

test("should return css with the selector prefixed", async () => {
  await run("a{ }", "#prefix a{ }", "#prefix");
});

test("should replace body and html selectors with selector prefix", async () => {
  await run(
    "html { font-size: 10px } body { background-color: #fff }",
    "#prefix { font-size: 10px } " + "#prefix { background-color: #fff }",
    "#prefix"
  );
});

test("should not add the selector prefix when it's already there", async () => {
  await run("#prefix a{ }", "#prefix a{ }", "#prefix");
});

test("should prefix class selectors", async () => {
  await run(
    ".myclass a{ } .myclass.active a{ }",
    "#prefix .myclass a{ } #prefix .myclass.active a{ }",
    "#prefix"
  );
});

test("should convert body.myclass to myprefix.myclass", async () => {
  await run(
    "body.myclass { background-color: #fff }",
    "#prefix.myclass { background-color: #fff }",
    "#prefix"
  );
});

test("should convert html.body.myclass to myprefix.myclass", async () => {
  await run(
    "html.body.myclass { background-color: #fff }",
    "#prefix.myclass { background-color: #fff }",
    "#prefix"
  );
});

test("should not add prefix to keyframes", async () => {
  await run(
    "@keyframes wobble { from { transform: none }" +
      "15% { transform: translate3d(-25%, 0, 0)" +
      "rotate3d(0, 0, 1, -5deg) }}",
    "@keyframes wobble { from { transform: none }" +
      "15% { transform: translate3d(-25%, 0, 0)" +
      "rotate3d(0, 0, 1, -5deg) }}",
    "#prefix"
  );
});
