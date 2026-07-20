let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.div', function(done) {
        // Test 1: Dividing zero by a real number should return zero
        let result1 = complex_js.ZERO.div(5);
        assert.strictEqual(result1.re, 0);
        assert.strictEqual(result1.im, 0);
        
        // Test 2: Dividing zero by a complex number should return zero
        let result2 = complex_js.ZERO.div(new complex_js(3, 4));
        assert.strictEqual(result2.re, 0);
        assert.strictEqual(result2.im, 0);
        
        // Test 3: Dividing zero by a negative real number should return zero
        let result3 = complex_js.ZERO.div(-2.5);
        assert.strictEqual(result3.re, 0);
        assert.strictEqual(result3.im, 0);
        
        // Test 4: Dividing zero by an object with re and im properties
        let result4 = complex_js.ZERO.div({re: 1, im: -2});
        assert.strictEqual(result4.re, 0);
        assert.strictEqual(result4.im, 0);
        
        // Test 5: Dividing zero by two separate real and imaginary parts
        let result5 = complex_js.ZERO.div(2, 3);
        assert.strictEqual(result5.re, 0);
        assert.strictEqual(result5.im, 0);
        
        // Test 6: Division by zero - check what actually happens
        let result6 = complex_js.ZERO.div(0);
        // The library likely returns NaN or Infinity for division by zero
        assert(isNaN(result6.re) || !isFinite(result6.re));
        assert(isNaN(result6.im) || !isFinite(result6.im));
        
        // Test 7: Division by complex zero - check what actually happens
        let result7 = complex_js.ZERO.div(new complex_js(0, 0));
        // The library likely returns NaN or Infinity for division by zero
        assert(isNaN(result7.re) || !isFinite(result7.re));
        assert(isNaN(result7.im) || !isFinite(result7.im));
        
        done();
    });
});