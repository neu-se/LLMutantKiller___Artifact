let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.neg', function(done) {
        // Test that negating ZERO returns ZERO (since -0 = 0)
        let result = complex_js.ZERO.neg();
        assert.ok(Math.abs(result.re) < Number.EPSILON, 'Real part of negated zero should be 0');
        assert.ok(Math.abs(result.im) < Number.EPSILON, 'Imaginary part of negated zero should be 0');
        done();
    });
});