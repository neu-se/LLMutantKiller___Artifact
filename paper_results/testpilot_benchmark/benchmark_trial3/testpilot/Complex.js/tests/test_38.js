let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sub', function(done) {
        // Test 1: Subtract two real numbers from ZERO
        let result1 = complex_js.ZERO.sub(3, 2);
        assert.equal(result1.re, -3, 'Real part should be -3');
        assert.equal(result1.im, -2, 'Imaginary part should be -2');

        // Test 2: Subtract one real number from ZERO
        let result2 = complex_js.ZERO.sub(5);
        assert.equal(result2.re, -5, 'Real part should be -5');
        assert.equal(result2.im, 0, 'Imaginary part should be 0');

        // Test 3: Subtract zero from ZERO
        let result3 = complex_js.ZERO.sub(0, 0);
        assert.equal(result3.re, 0, 'Real part should be 0');
        assert.equal(result3.im, 0, 'Imaginary part should be 0');

        // Test 4: Subtract negative numbers from ZERO
        let result4 = complex_js.ZERO.sub(-2, -3);
        assert.equal(result4.re, 2, 'Real part should be 2');
        assert.equal(result4.im, 3, 'Imaginary part should be 3');

        // Test 5: Subtract a complex object from ZERO
        let complexNum = new complex_js(4, 5);
        let result5 = complex_js.ZERO.sub(complexNum);
        assert.equal(result5.re, -4, 'Real part should be -4');
        assert.equal(result5.im, -5, 'Imaginary part should be -5');

        // Test 6: Subtract decimal numbers from ZERO
        let result6 = complex_js.ZERO.sub(1.5, 2.7);
        assert.approximately(result6.re, -1.5, 0.0001, 'Real part should be approximately -1.5');
        assert.approximately(result6.im, -2.7, 0.0001, 'Imaginary part should be approximately -2.7');

        done();
    });
});