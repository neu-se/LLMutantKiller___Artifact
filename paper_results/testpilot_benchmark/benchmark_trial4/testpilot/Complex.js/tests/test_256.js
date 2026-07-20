let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.floor', function(done) {
        // Test floor with no places argument (default behavior)
        let result1 = complex_js.ZERO.floor();
        assert.strictEqual(result1.re, 0);
        assert.strictEqual(result1.im, 0);
        
        // Test floor with places = 0
        let result2 = complex_js.ZERO.floor(0);
        assert.strictEqual(result2.re, 0);
        assert.strictEqual(result2.im, 0);
        
        // Test floor with positive places
        let result3 = complex_js.ZERO.floor(2);
        assert.strictEqual(result3.re, 0);
        assert.strictEqual(result3.im, 0);
        
        // Test floor with negative places
        let result4 = complex_js.ZERO.floor(-1);
        assert.strictEqual(result4.re, 0);
        assert.strictEqual(result4.im, 0);
        
        // Verify that the result is a Complex object
        assert.ok(result1 instanceof complex_js);
        
        // Verify that ZERO itself is unchanged (immutability check)
        assert.strictEqual(complex_js.ZERO.re, 0);
        assert.strictEqual(complex_js.ZERO.im, 0);
        
        done();
    });
});