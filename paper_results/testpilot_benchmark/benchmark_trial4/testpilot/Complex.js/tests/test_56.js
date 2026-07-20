let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.div', function(done) {
        // Test 0 / 0 = NaN
        let result1 = complex_js.ZERO.div(0, 0);
        assert.strictEqual(result1.toString(), complex_js.NAN.toString());
        
        // Test 0 / non-zero = 0
        let result2 = complex_js.ZERO.div(3, 4);
        assert.strictEqual(result2.toString(), complex_js.ZERO.toString());
        
        // Test 0 / real number = 0
        let result3 = complex_js.ZERO.div(5, 0);
        assert.strictEqual(result3.toString(), complex_js.ZERO.toString());
        
        // Test 0 / infinity = 0
        let result4 = complex_js.ZERO.div(Infinity, 0);
        assert.strictEqual(result4.toString(), complex_js.ZERO.toString());
        
        // Test 0 / complex infinity = 0
        let result5 = complex_js.ZERO.div(Infinity, Infinity);
        assert.strictEqual(result5.toString(), complex_js.ZERO.toString());
        
        // Test division by pure real number
        let result6 = complex_js.ZERO.div(2, 0);
        assert.strictEqual(result6.re, 0);
        assert.strictEqual(result6.im, 0);
        
        // Test division by pure imaginary number
        let result7 = complex_js.ZERO.div(0, 3);
        assert.strictEqual(result7.re, 0);
        assert.strictEqual(result7.im, 0);
        
        // Verify that ZERO is actually zero
        assert.strictEqual(complex_js.ZERO.re, 0);
        assert.strictEqual(complex_js.ZERO.im, 0);
        
        done();
    });
});