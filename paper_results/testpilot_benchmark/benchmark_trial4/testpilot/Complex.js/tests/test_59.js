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
        let result4 = complex_js.ZERO.div(complex_js.INFINITY.re, complex_js.INFINITY.im);
        assert.strictEqual(result4.toString(), complex_js.ZERO.toString());
        
        // Test 0 / complex number = 0
        let result5 = complex_js.ZERO.div(2, 3);
        assert.strictEqual(result5.toString(), complex_js.ZERO.toString());
        
        // Test 0 / pure imaginary = 0
        let result6 = complex_js.ZERO.div(0, 7);
        assert.strictEqual(result6.toString(), complex_js.ZERO.toString());
        
        // Test 0 / negative real = 0
        let result7 = complex_js.ZERO.div(-4, 0);
        assert.strictEqual(result7.toString(), complex_js.ZERO.toString());
        
        // Test 0 / negative complex = 0
        let result8 = complex_js.ZERO.div(-2, -3);
        assert.strictEqual(result8.toString(), complex_js.ZERO.toString());
        
        done();
    });
});