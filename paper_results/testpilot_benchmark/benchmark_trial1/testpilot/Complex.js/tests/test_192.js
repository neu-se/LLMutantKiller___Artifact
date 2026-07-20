let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.asinh', function(done) {
        // Test asinh(0) = 0
        let zero = new complex_js(0, 0);
        let result = zero.asinh();
        assert(Math.abs(result.re) < 1e-10, 'Real part should be approximately 0');
        assert(Math.abs(result.im) < 1e-10, 'Imaginary part should be approximately 0');
        
        // Test asinh(1) = ln(1 + sqrt(2)) ≈ 0.881373587
        let one = new complex_js(1, 0);
        let result1 = one.asinh();
        let expected1 = Math.log(1 + Math.sqrt(2));
        assert(Math.abs(result1.re - expected1) < 1e-10, 'asinh(1) real part incorrect');
        assert(Math.abs(result1.im) < 1e-10, 'asinh(1) imaginary part should be 0');
        
        // Test asinh(-1) = -ln(1 + sqrt(2)) ≈ -0.881373587
        let negOne = new complex_js(-1, 0);
        let resultNeg1 = negOne.asinh();
        assert(Math.abs(resultNeg1.re + expected1) < 1e-10, 'asinh(-1) real part incorrect');
        assert(Math.abs(resultNeg1.im) < 1e-10, 'asinh(-1) imaginary part should be 0');
        
        // Test asinh(i) = i*π/2
        let i = new complex_js(0, 1);
        let resultI = i.asinh();
        assert(Math.abs(resultI.re) < 1e-10, 'asinh(i) real part should be 0');
        assert(Math.abs(resultI.im - Math.PI/2) < 1e-10, 'asinh(i) imaginary part should be π/2');
        
        // Test asinh(-i) = -i*π/2
        let negI = new complex_js(0, -1);
        let resultNegI = negI.asinh();
        assert(Math.abs(resultNegI.re) < 1e-10, 'asinh(-i) real part should be 0');
        assert(Math.abs(resultNegI.im + Math.PI/2) < 1e-10, 'asinh(-i) imaginary part should be -π/2');
        
        // Test with a general complex number: asinh(1+i)
        let complex1 = new complex_js(1, 1);
        let resultComplex = complex1.asinh();
        // Verify using the identity: asinh(z) = log(z + sqrt(z^2 + 1))
        let z = new complex_js(1, 1);
        let z_squared = z.mul(z);
        let z_squared_plus_1 = z_squared.add(1);
        let sqrt_term = z_squared_plus_1.sqrt();
        let sum = z.add(sqrt_term);
        let expected = sum.log();
        assert(Math.abs(resultComplex.re - expected.re) < 1e-10, 'asinh(1+i) real part incorrect');
        assert(Math.abs(resultComplex.im - expected.im) < 1e-10, 'asinh(1+i) imaginary part incorrect');
        
        // Test that the original object is not modified
        let original = new complex_js(2, 3);
        let originalRe = original.re;
        let originalIm = original.im;
        original.asinh();
        assert(original.re === originalRe, 'Original real part should not be modified');
        assert(original.im === originalIm, 'Original imaginary part should not be modified');
        
        done();
    });
});