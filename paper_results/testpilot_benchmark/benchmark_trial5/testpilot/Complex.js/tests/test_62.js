let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.div', function(done) {
        // Test 1: Divide zero by a real number
        let result1 = complex_js.ZERO.div(5);
        assert.strictEqual(result1.re, 0);
        assert.strictEqual(result1.im, 0);
        
        // Test 2: Divide zero by a complex number
        let result2 = complex_js.ZERO.div(new complex_js(3, 4));
        assert.strictEqual(result2.re, 0);
        assert.strictEqual(result2.im, 0);
        
        // Test 3: Divide zero by a negative real number
        let result3 = complex_js.ZERO.div(-2.5);
        assert.strictEqual(result3.re, 0);
        assert.strictEqual(result3.im, 0);
        
        // Test 4: Divide zero by a pure imaginary number
        let result4 = complex_js.ZERO.div(new complex_js(0, 7));
        assert.strictEqual(result4.re, 0);
        assert.strictEqual(result4.im, 0);
        
        // Test 5: Divide zero by a complex number with both real and imaginary parts
        let result5 = complex_js.ZERO.div(new complex_js(-1.5, 2.8));
        assert.strictEqual(result5.re, 0);
        assert.strictEqual(result5.im, 0);
        
        // Test 6: Division by zero returns NaN (not an error)
        let result6 = complex_js.ZERO.div(0);
        assert(isNaN(result6.re));
        assert(isNaN(result6.im));
        
        // Test 7: Division by complex zero returns NaN (not an error)
        let result7 = complex_js.ZERO.div(new complex_js(0, 0));
        assert(isNaN(result7.re));
        assert(isNaN(result7.im));
        
        done();
    });
});