let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.atan', function(done) {
        // Test atan of zero (0 + 0i)
        let result = complex_js.ZERO.atan();
        assert.strictEqual(result.re, 0, 'Real part of atan(0) should be 0');
        assert.strictEqual(result.im, 0, 'Imaginary part of atan(0) should be 0');
        done();
    });

    })