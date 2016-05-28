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

    it(
    'should prefix class selectors',
    function (done) {
        test(
            '.myclass a{ } .myclass.active a{ }',
            '#prefix .myclass a{ } #prefix .myclass.active a{ }',
            '#prefix', done
        );
    });

    it(
    'should convert body.myclass to myprefix.myclass',
    function (done) {
        test(
            'body.myclass { background-color: #fff; }',
            '#prefix.myclass { background-color: #fff; }',
            '#prefix', done
        );
    });

    it(
    'should convert html.body.myclass to myprefix.myclass',
    function (done) {
        test(
            'html.body.myclass { background-color: #fff; }',
            '#prefix.myclass { background-color: #fff; }',
            '#prefix', done
        );
    });

    it(
    'should not add prefix to keyframes',
    function (done) {
        test(
            '@keyframes wobble { from { transform: none; }' +
            '15% { transform: translate3d(-25%, 0, 0)' +
            'rotate3d(0, 0, 1, -5deg); }}',
            '@keyframes wobble { from { transform: none; }' +
            '15% { transform: translate3d(-25%, 0, 0)' +
            'rotate3d(0, 0, 1, -5deg); }}',
            '#prefix', done
        );
    });

});
