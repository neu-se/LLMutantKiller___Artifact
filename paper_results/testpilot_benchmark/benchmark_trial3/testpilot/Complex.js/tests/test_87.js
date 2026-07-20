let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.expm1', function(done) {
        // Test expm1() on ZERO (0 + 0i)
        // exp(0 + 0i) - 1 = 1 - 1 = 0 + 0i
        let result = complex_js.ZERO.expm1();
        assert.strictEqual(result.re, 0, 'Real part should be 0');
        assert.strictEqual(result.im, 0, 'Imaginary part should be 0');
        done();
    });

    })