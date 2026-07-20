let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.neg', function(done) {
        // Test that negating ZERO returns ZERO (since -0 = 0)
        let result = complex_js.ZERO.neg();
        assert.strictEqual(result.re, 0, 'Real part of negated ZERO should be 0');
        assert.strictEqual(result.im, 0, 'Imaginary part of negated ZERO should be 0');
        done();
    });

    })