let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.acsc', function(done) {
        // Test 1: Zero case - should return (π/2, ∞)
        let result = complex_js.ZERO.acsc();
        assert.strictEqual(result.re, Math.PI / 2);
        assert.strictEqual(result.im, Infinity);
        
        // Test 2: Real positive number
        let c1 = new complex_js(2, 0);
        let result1 = c1.acsc();
        // acsc(2) should be approximately 0.5236 (π/6)
        assert(Math.abs(result1.re - Math.PI/6) < 1e-10);
        assert(Math.abs(result1.im) < 1e-10);
        
        // Test 3: Real negative number
        let c2 = new complex_js(-2, 0);
        let result2 = c2.acsc();
        // acsc(-2) should be approximately -π/6
        assert(Math.abs(result2.re + Math.PI/6) < 1e-10);
        assert(Math.abs(result2.im) < 1e-10);
        
        // Test 4: Pure imaginary number
        let c3 = new complex_js(0, 1);
        let result3 = c3.acsc();
        // Should have real and imaginary parts
        assert(typeof result3.re === 'number');
        assert(typeof result3.im === 'number');
        assert(!isNaN(result3.re));
        assert(!isNaN(result3.im));
        
        // Test 5: Complex number with both real and imaginary parts
        let c4 = new complex_js(1, 1);
        let result4 = c4.acsc();
        assert(typeof result4.re === 'number');
        assert(typeof result4.im === 'number');
        assert(!isNaN(result4.re));
        assert(!isNaN(result4.im));
        
        // Test 6: Unit real number (edge case)
        let c5 = new complex_js(1, 0);
        let result5 = c5.acsc();
        // acsc(1) = π/2
        assert(Math.abs(result5.re - Math.PI/2) < 1e-10);
        assert(Math.abs(result5.im) < 1e-10);
        
        // Test 7: Unit negative real number (edge case)
        let c6 = new complex_js(-1, 0);
        let result6 = c6.acsc();
        // acsc(-1) = -π/2
        assert(Math.abs(result6.re + Math.PI/2) < 1e-10);
        assert(Math.abs(result6.im) < 1e-10);
        
        done();
    });
});