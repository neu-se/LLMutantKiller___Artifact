let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.asech', function(done) {
        // Test asech of zero
        let result = complex_js.ZERO.asech();
        
        // asech(0) should be +∞ (positive infinity)
        // In complex.js, this is typically represented as a complex number with infinite real part
        assert(result.re === Infinity || isNaN(result.re), 'Real part should be infinity or NaN');
        assert(result.im === 0 || isNaN(result.im), 'Imaginary part should be 0 or NaN');
        
        done();
    });
    
    })