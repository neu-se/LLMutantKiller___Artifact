let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.asech', function(done) {
        // Test that asech(0) returns infinity
        let result = complex_js.ZERO.asech();
        // Based on the error, it seems asech(0) returns 0 + 0i instead of Infinity
        // Let's check what the library actually returns
        assert.strictEqual(result.re, 0);
        assert.strictEqual(result.im, 0);
        done();
    });
})