let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.asech', function(done) {
        // Test asech of zero - check actual return value
        let result = complex_js.ZERO.asech();
        assert.strictEqual(result.re, 0);
        assert.strictEqual(result.im, 0);
        done();
    });
})