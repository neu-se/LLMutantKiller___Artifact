let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.asec', function(done) {
        // Test 1: asec(0) should return (0, Infinity)
        let result = complex_js.ZERO.asec();
        assert.strictEqual(result.re, 0, 'Real part should be 0');
        assert.strictEqual(result.im, Infinity, 'Imaginary part should be Infinity');
        
        // Test 2: asec(1) should return 0 (real number case)
        let one = new complex_js(1, 0);
        let result1 = one.asec();
        assert.ok(Math.abs(result1.re - 0) < 1e-10, 'asec(1) real part should be approximately 0');
        assert.ok(Math.abs(result1.im - 0) < 1e-10, 'asec(1) imaginary part should be approximately 0');
        
        // Test 3: asec(-1) should return π
        let minusOne = new complex_js(-1, 0);
        let result2 = minusOne.asec();
        assert.ok(Math.abs(result2.re - Math.PI) < 1e-10, 'asec(-1) real part should be approximately π');
        assert.ok(Math.abs(result2.im - 0) < 1e-10, 'asec(-1) imaginary part should be approximately 0');
        
        // Test 4: asec(i) - test with pure imaginary number
        let i = new complex_js(0, 1);
        let result3 = i.asec();
        assert.ok(typeof result3.re === 'number', 'Result should have numeric real part');
        assert.ok(typeof result3.im === 'number', 'Result should have numeric imaginary part');
        
        // Test 5: asec(1+i) - test with general complex number
        let complex = new complex_js(1, 1);
        let result4 = complex.asec();
        assert.ok(typeof result4.re === 'number', 'Result should have numeric real part');
        assert.ok(typeof result4.im === 'number', 'Result should have numeric imaginary part');
        assert.ok(isFinite(result4.re), 'Real part should be finite');
        assert.ok(isFinite(result4.im), 'Imaginary part should be finite');
        
        done();
    });
});