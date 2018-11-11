var postcss = require('postcss')

var plugin = require('../')

function run (input, output, opts, done) {
    postcss([plugin(opts)]).process(input).then(function (result) {
        expect(result.css).toEqual(output)
        expect(result.warnings().length).toBe(0)
        done()
    }).catch(function (error) {
        done(error)
    })
}

describe('postcss-selector-prefix', function () {
    it('should return css with the selector prefixed', function (done) {
        run('a{ }', '#prefix a{ }', '#prefix', done)
    })

    it(
        'should replace body and html selectors with selector prefix',
        function (done) {
            run(
                'html { font-size: 10px } body { background-color: #fff }',
                '#prefix { font-size: 10px } ' +
                '#prefix { background-color: #fff }',
                '#prefix', done
            )
        }
    )

    it(
        'should not add the selector prefix when it\'s already there',
        function (done) {
            run('#prefix a{ }', '#prefix a{ }', '#prefix', done)
        }
    )

    it(
        'should prefix class selectors',
        function (done) {
            run(
                '.myclass a{ } .myclass.active a{ }',
                '#prefix .myclass a{ } #prefix .myclass.active a{ }',
                '#prefix', done
            )
        }
    )

    it(
        'should convert body.myclass to myprefix.myclass',
        function (done) {
            run(
                'body.myclass { background-color: #fff }',
                '#prefix.myclass { background-color: #fff }',
                '#prefix', done
            )
        }
    )

    it(
        'should convert html.body.myclass to myprefix.myclass',
        function (done) {
            run(
                'html.body.myclass { background-color: #fff }',
                '#prefix.myclass { background-color: #fff }',
                '#prefix', done
            )
        }
    )

    it(
        'should not add prefix to keyframes',
        function (done) {
            run(
                '@keyframes wobble { from { transform: none }' +
                '15% { transform: translate3d(-25%, 0, 0)' +
                'rotate3d(0, 0, 1, -5deg) }}',
                '@keyframes wobble { from { transform: none }' +
                '15% { transform: translate3d(-25%, 0, 0)' +
                'rotate3d(0, 0, 1, -5deg) }}',
                '#prefix', done
            )
        }
    )
})
