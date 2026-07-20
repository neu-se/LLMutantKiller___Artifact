let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sign', function(done) {
        // Test that the sign of zero returns NaN (mathematically correct)
        let result = complex_js.ZERO.sign();
        assert.ok(isNaN(result.re), 'Real part of ZERO.sign() should be NaN');
        assert.ok(isNaN(result.im), 'Imaginary part of ZERO.sign() should be NaN');
        done();
    });
})