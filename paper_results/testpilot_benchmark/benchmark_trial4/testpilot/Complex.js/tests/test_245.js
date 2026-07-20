let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.neg', function(done) {
        // Test that negating ZERO returns ZERO (since -0 = 0)
        let result = complex_js.ZERO.neg();
        assert.strictEqual(Math.abs(result.re), 0, 'Real part of negated zero should be 0');
        assert.strictEqual(Math.abs(result.im), 0, 'Imaginary part of negated zero should be 0');
        done();
    });
});