let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sign', function(done) {
        // Test the sign of zero complex number
        // This should handle the division by zero case
        let zero = complex_js.ZERO;
        let result = zero.sign();
        
        // For zero complex number, the result should be NaN for both parts
        // since we're dividing 0/0
        assert(isNaN(result.re), 'Real part should be NaN for zero complex number');
        assert(isNaN(result.im), 'Imaginary part should be NaN for zero complex number');
        
        done();
    });
    
    })