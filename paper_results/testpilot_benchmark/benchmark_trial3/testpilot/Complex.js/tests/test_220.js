let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.inverse', function(done) {
        // Test that 1/0 returns INFINITY
        let result = complex_js.ZERO.inverse();
        assert.strictEqual(result.isInfinite(), true, 'Inverse of zero should be infinity');
        done();
    });

    })