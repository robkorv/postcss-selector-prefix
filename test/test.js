'use strict';
const postcss = require('postcss');
const expect  = require('chai').expect;

const plugin = require('../');

let test = (input, output, opts, done) => {
    postcss([ plugin(opts) ]).process(input).then((result) => {
        expect(result.css).to.eql(output);
        expect(result.warnings()).to.be.empty;
        done();
    }).catch((error) => {
        done(error);
    });
};

describe('postcss-selector-prefix', () => {

    it('should return css with the selector prefixed', (done) => {
        test('a{ }', '#prefix a{ }', '#prefix', done);
    });

    it(
        'should replace body and html selectors with selector prefix',
        (done) => {
            test(
                'html { font-size: 10px; } body { background-color: #fff; }',
                '#prefix { font-size: 10px; } ' +
                '#prefix { background-color: #fff; }',
                '#prefix', done
            );
        }
    );

    it(
        'should not add the selector prefix when it\'s already there',
        (done) => {
            test('#prefix a{ }', '#prefix a{ }', '#prefix', done);
        }
    );

    it(
        'should prefix class selectors',
        (done) => {
            test(
                '.myclass a{ } .myclass.active a{ }',
                '#prefix .myclass a{ } #prefix .myclass.active a{ }',
                '#prefix', done
            );
        }
    );

    it(
        'should convert body.myclass to myprefix.myclass',
        (done) => {
            test(
                'body.myclass { background-color: #fff; }',
                '#prefix.myclass { background-color: #fff; }',
                '#prefix', done
            );
        }
    );

    it(
        'should convert html.body.myclass to myprefix.myclass',
        (done) => {
            test(
                'html.body.myclass { background-color: #fff; }',
                '#prefix.myclass { background-color: #fff; }',
                '#prefix', done
            );
        }
    );

    it(
        'should not add prefix to keyframes',
        (done) => {
            test(
                '@keyframes wobble { from { transform: none; }' +
                '15% { transform: translate3d(-25%, 0, 0)' +
                'rotate3d(0, 0, 1, -5deg); }}',
                '@keyframes wobble { from { transform: none; }' +
                '15% { transform: translate3d(-25%, 0, 0)' +
                'rotate3d(0, 0, 1, -5deg); }}',
                '#prefix', done
            );
        }
    );

});
