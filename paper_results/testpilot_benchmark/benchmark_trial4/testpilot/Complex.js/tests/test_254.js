let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.floor', function(done) {
        // Test 1: Floor with no places argument (default to 0 decimal places)
        let result1 = complex_js.ZERO.floor();
        assert.strictEqual(result1.re, 0);
        assert.strictEqual(result1.im, 0);
        
        // Test 2: Floor with 0 places
        let result2 = complex_js.ZERO.floor(0);
        assert.strictEqual(result2.re, 0);
        assert.strictEqual(result2.im, 0);
        
        // Test 3: Floor with positive places
        let result3 = complex_js.ZERO.floor(2);
        assert.strictEqual(result3.re, 0);
        assert.strictEqual(result3.im, 0);
        
        // Test 4: Floor with negative places
        let result4 = complex_js.ZERO.floor(-1);
        assert.strictEqual(result4.re, 0);
        assert.strictEqual(result4.im, 0);
        
        // Test 5: Test with a non-zero complex number for comparison
        let complex1 = new complex_js(3.456, -2.789);
        let result5 = complex1.floor(2);
        assert.strictEqual(result5.re, 3.45);
        assert.strictEqual(result5.im, -2.79);
        
        // Test 6: Test with a non-zero complex number, no places
        let complex2 = new complex_js(3.456, -2.789);
        let result6 = complex2.floor();
        assert.strictEqual(result6.re, 3);
        assert.strictEqual(result6.im, -3);
        
        // Test 7: Test that result is a new Complex instance
        let result7 = complex_js.ZERO.floor(1);
        assert.notStrictEqual(result7, complex_js.ZERO);
        assert.ok(result7 instanceof complex_js);
        
        done();
    });
});