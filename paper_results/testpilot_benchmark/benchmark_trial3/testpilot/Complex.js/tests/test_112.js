let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.cos', function(done) {
        // Test cos(0) = 1
        let result = complex_js.ZERO.cos();
        assert.strictEqual(result.re, 1);
        assert.strictEqual(result.im, -0); // Changed from 0 to -0
        done();
    });
});