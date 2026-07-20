let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.floor', function(done) {
        // Test 1: Floor with no places argument (default to 0 decimal places)
        let c1 = new complex_js(3.7, 2.9);
        let result1 = c1.floor();
        assert.strictEqual(result1.re, 3);
        assert.strictEqual(result1.im, 2);

        // Test 2: Floor with 1 decimal place
        let c2 = new complex_js(3.76, 2.94);
        let result2 = c2.floor(1);
        assert.strictEqual(result2.re, 3.7);
        assert.strictEqual(result2.im, 2.9);

        // Test 3: Floor with 2 decimal places
        let c3 = new complex_js(3.789, 2.987);
        let result3 = c3.floor(2);
        assert.strictEqual(result3.re, 3.78);
        assert.strictEqual(result3.im, 2.98);

        // Test 4: Floor with negative numbers
        let c4 = new complex_js(-3.7, -2.9);
        let result4 = c4.floor();
        assert.strictEqual(result4.re, -4);
        assert.strictEqual(result4.im, -3);

        // Test 5: Floor with zero values
        let c5 = new complex_js(0, 0);
        let result5 = c5.floor(2);
        assert.strictEqual(result5.re, 0);
        assert.strictEqual(result5.im, 0);

        // Test 6: Floor with places = 0 explicitly
        let c6 = new complex_js(5.99, 4.11);
        let result6 = c6.floor(0);
        assert.strictEqual(result6.re, 5);
        assert.strictEqual(result6.im, 4);

        // Test 7: Floor with already integer values
        let c7 = new complex_js(5, 4);
        let result7 = c7.floor(1);
        assert.strictEqual(result7.re, 5);
        assert.strictEqual(result7.im, 4);

        done();
    });
});