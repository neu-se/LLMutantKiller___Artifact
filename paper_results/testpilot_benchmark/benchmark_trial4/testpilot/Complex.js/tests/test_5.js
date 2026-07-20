let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sign', function(done) {
        // Test zero complex number - this should handle division by zero
        let zero = complex_js.ZERO;
        let zeroSign = zero.sign();
        
        // For zero, the result should be NaN for both components due to 0/0
        assert(isNaN(zeroSign.re), 'Real part of zero sign should be NaN');
        assert(isNaN(zeroSign.im), 'Imaginary part of zero sign should be NaN');
        
        done();
    });
    
    })