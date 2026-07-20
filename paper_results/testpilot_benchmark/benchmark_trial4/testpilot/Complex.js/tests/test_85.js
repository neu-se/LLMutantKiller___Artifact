let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.exp', function(done) {
        // Test exp() of zero (0 + 0i)
        // e^(0 + 0i) = e^0 * (cos(0) + i*sin(0)) = 1 * (1 + 0i) = 1 + 0i
        let result = complex_js.ZERO.exp();
        assert.strictEqual(result.re, 1, 'Real part should be 1');
        assert.strictEqual(result.im, 0, 'Imaginary part should be 0');
        done();
    });

    })