let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sech', function(done) {
        // Test sech(0) = 1
        let result = complex_js.ZERO.sech();
        assert.strictEqual(result.re, 1, 'Real part of sech(0) should be 1');
        assert.ok(Math.abs(result.im) < 1e-10, 'Imaginary part of sech(0) should be approximately 0');
        done();
    });
});