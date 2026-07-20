let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.ceil', function(done) {
        // Test 1: ZERO with default places (0)
        let result1 = complex_js.ZERO.ceil();
        assert.strictEqual(result1.re, 0);
        assert.strictEqual(result1.im, 0);
        
        // Test 2: ZERO with 2 decimal places
        let result2 = complex_js.ZERO.ceil(2);
        assert.strictEqual(result2.re, 0);
        assert.strictEqual(result2.im, 0);
        
        // Test 3: ZERO with negative places
        let result3 = complex_js.ZERO.ceil(-1);
        assert.strictEqual(result3.re, 0);
        assert.strictEqual(result3.im, 0);
        
        // Test 4: Create a non-zero complex number and test ceil
        let complex1 = new complex_js(1.234, -2.567);
        let result4 = complex1.ceil();
        assert.strictEqual(result4.re, 2);
        assert.strictEqual(result4.im, -2);
        
        // Test 5: Test ceil with 1 decimal place
        let complex2 = new complex_js(1.234, -2.567);
        let result5 = complex2.ceil(1);
        assert.strictEqual(result5.re, 1.3);
        assert.strictEqual(result5.im, -2.5);
        
        // Test 6: Test ceil with 2 decimal places
        let complex3 = new complex_js(1.234, -2.567);
        let result6 = complex3.ceil(2);
        assert.strictEqual(result6.re, 1.24);
        assert.strictEqual(result6.im, -2.56);
        
        // Test 7: Test with positive imaginary part
        let complex4 = new complex_js(-1.234, 2.567);
        let result7 = complex4.ceil();
        assert.strictEqual(result7.re, -1);
        assert.strictEqual(result7.im, 3);
        
        done();
    });
});