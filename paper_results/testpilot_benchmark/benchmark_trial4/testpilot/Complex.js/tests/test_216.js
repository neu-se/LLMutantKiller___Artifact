let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.asech', function(done) {
        // Test asech(0) which should return complex infinity
        let result = complex_js.ZERO.asech();
        
        // asech(0) = ln(1/0 + sqrt(1/0^2 - 1)) = ln(∞) = ∞
        // The result should be complex infinity
        assert(result.re === Infinity || result.re === -Infinity, 'Real part should be infinite');
        // For asech(0), the imaginary part might be π/2 or some other value depending on the branch
        assert(typeof result.im === 'number' && isFinite(result.im), 'Imaginary part should be a finite number');
        
        done();
    });
    
});