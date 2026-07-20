let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.isZero returns true for zero complex number', function(done) {
        // Test that ZERO constant correctly identifies itself as zero
        assert.strictEqual(complex_js.ZERO.isZero(), true);
        done();
    });

    })