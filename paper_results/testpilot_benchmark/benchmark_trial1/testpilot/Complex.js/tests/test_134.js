let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.csc should handle division by zero appropriately', function(done) {
        // csc(0) is undefined since csc(z) = 1/sin(z) and sin(0) = 0
        // Instead of expecting an error, check if it returns Infinity or NaN
        let result = complex_js.ZERO.csc();
        
        // Check if the result indicates division by zero (Infinity or NaN)
        assert(result.re === Infinity || result.re === -Infinity || isNaN(result.re) || 
               result.im === Infinity || result.im === -Infinity || isNaN(result.im),
               'csc(0) should result in Infinity or NaN');
        done();
    });
});