let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.div', function(done) {
        // Test dividing zero by a non-zero complex number
        let a = new complex_js(3, 4);
        let result1 = complex_js.ZERO.div(a);
        assert.strictEqual(result1.re, 0);
        assert.strictEqual(result1.im, 0);
        
        // Test dividing zero by a real number
        let result2 = complex_js.ZERO.div(5);
        assert.strictEqual(result2.re, 0);
        assert.strictEqual(result2.im, 0);
        
        // Test dividing zero by a pure imaginary number
        let b = new complex_js(0, 2);
        let result3 = complex_js.ZERO.div(b);
        assert.strictEqual(result3.re, 0);
        assert.strictEqual(result3.im, 0);
        
        // Test dividing zero by negative complex number
        let c = new complex_js(-1, -3);
        let result4 = complex_js.ZERO.div(c);
        assert.strictEqual(result4.re, 0);
        assert.strictEqual(result4.im, 0);
        
        // Test that dividing by zero throws an error
        assert.throws(() => {
            complex_js.ZERO.div(0);
        }, Error);
        
        assert.throws(() => {
            complex_js.ZERO.div(complex_js.ZERO);
        }, Error);
        
        done();
    });
});