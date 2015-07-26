var postcss = require('postcss');
var expect  = require('chai').expect;

var plugin = require('../');

var test = function (input, output, opts, done) {
    postcss([ plugin(opts) ]).process(input).then(function (result) {
        expect(result.css).to.eql(output);
        expect(result.warnings()).to.be.empty;
        done();
    }).catch(function (error) {
        done(error);
    });
};

describe('postcss-selector-prefix', function () {

    it('should return css with the selector prefixed', function (done) {
        test('a{ }', '#prefix a{ }', '#prefix', done);
    });

    it(
    'should replace body and html selectors with selector prefix',
    function (done) {
        test(
            'html { font-size: 10px; } body { background-color: #fff; }',
            '#prefix { font-size: 10px; } #prefix { background-color: #fff; }',
            '#prefix', done
        );
    });

    it(
    'should not add the selector prefix when it\'s already there',
    function (done) {
        test('#prefix a{ }', '#prefix a{ }', '#prefix', done);
    });

});
