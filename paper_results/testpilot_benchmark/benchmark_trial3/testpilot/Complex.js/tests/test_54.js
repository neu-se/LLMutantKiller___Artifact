let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.mul', function(done) {
        // Test 1: ZERO multiplied by any complex number should return ZERO
        let result1 = complex_js.ZERO.mul(new complex_js(5, 3));
        assert.equal(result1.re, 0);
        assert.equal(result1.im, 0);
        
        // Test 2: ZERO multiplied by a real number should return ZERO
        let result2 = complex_js.ZERO.mul(42);
        assert.equal(result2.re, 0);
        assert.equal(result2.im, 0);
        
        // Test 3: ZERO multiplied by an object with re and im properties
        let result3 = complex_js.ZERO.mul({re: 7, im: -2});
        assert.equal(result3.re, 0);
        assert.equal(result3.im, 0);
        
        // Test 4: ZERO multiplied by another ZERO should return ZERO
        let result4 = complex_js.ZERO.mul(complex_js.ZERO);
        assert.equal(result4.re, 0);
        assert.equal(result4.im, 0);
        
        // Test 5: ZERO multiplied by a negative complex number
        let result5 = complex_js.ZERO.mul(new complex_js(-3, -4));
        assert.equal(result5.re, 0);
        assert.equal(result5.im, 0);
        
        // Test 6: Verify the result is a Complex instance
        let result6 = complex_js.ZERO.mul(1);
        assert(result6 instanceof complex_js);
        
        done();
    });
});