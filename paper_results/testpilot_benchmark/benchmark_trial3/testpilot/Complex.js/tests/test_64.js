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
        
        // Test 3: Dividing zero by a complex number with object notation
        let result3 = complex_js.ZERO.div({re: 2, im: -1});
        assert.strictEqual(result3.re, 0);
        assert.strictEqual(result3.im, 0);
        
        // Test 4: Dividing zero by a negative real number
        let result4 = complex_js.ZERO.div(-7.5);
        assert.strictEqual(result4.re, 0);
        assert.strictEqual(result4.im, 0);
        
        // Test 5: Dividing zero by a pure imaginary number
        let result5 = complex_js.ZERO.div(new complex_js(0, 3));
        assert.strictEqual(result5.re, 0);
        assert.strictEqual(result5.im, 0);
        
        // Test 6: Division by zero should throw an error
        assert.throws(() => {
            complex_js.ZERO.div(0);
        }, Error);
        
        // Test 7: Division by complex zero should throw an error
        assert.throws(() => {
            complex_js.ZERO.div(new complex_js(0, 0));
        }, Error);
        
        done();
    });
});