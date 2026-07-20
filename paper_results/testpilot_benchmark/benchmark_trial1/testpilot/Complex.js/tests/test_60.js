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
        let result4 = complex_js.ZERO.div(complex_js.INFINITY);
        assert.strictEqual(result4.toString(), complex_js.ZERO.toString());
        
        // Test division by zero should return infinity
        let nonZero = new complex_js(2, 3);
        let result5 = nonZero.div(0, 0);
        assert.strictEqual(result5.toString(), complex_js.INFINITY.toString());
        
        // Test normal complex division
        let c1 = new complex_js(4, 2);
        let result6 = c1.div(2, 0); // (4+2i) / 2 = 2+i
        assert.strictEqual(result6.re, 2);
        assert.strictEqual(result6.im, 1);
        
        // Test complex division with imaginary divisor
        let c2 = new complex_js(1, 1);
        let result7 = c2.div(0, 1); // (1+i) / i = 1-i
        assert.strictEqual(result7.re, 1);
        assert.strictEqual(result7.im, -1);
        
        // Test complex division with both real and imaginary parts
        let c3 = new complex_js(3, 4);
        let result8 = c3.div(1, 2); // (3+4i) / (1+2i) = (11-2i)/5
        assert.strictEqual(Math.round(result8.re * 10) / 10, 2.2);
        assert.strictEqual(Math.round(result8.im * 10) / 10, -0.4);
        
        done();
    });
});