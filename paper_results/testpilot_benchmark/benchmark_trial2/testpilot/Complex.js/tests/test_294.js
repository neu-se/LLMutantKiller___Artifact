let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.isZero returns true', function(done) {
        // Test that the ZERO constant correctly identifies itself as zero
        let result = complex_js.ZERO.isZero();
        assert.strictEqual(result, true, 'ZERO constant should return true for isZero()');
        done();
    });

    })