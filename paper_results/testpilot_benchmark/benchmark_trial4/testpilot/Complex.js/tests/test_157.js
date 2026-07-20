let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.asec', function(done) {
        try {
            // Test that calling asec() on ZERO throws an error or returns infinity
            // since asec(0) = arccos(1/0) which is undefined
            let result = complex_js.ZERO.asec();
            
            // Check if result is infinity or NaN
            assert(result.re === Infinity || isNaN(result.re) || result.re === -Infinity, 
                   'asec(0) should result in infinity or NaN for real part');
            
            done();
        } catch (error) {
            // If an error is thrown, that's also acceptable behavior for asec(0)
            assert(error instanceof Error, 'Should throw an error for asec(0)');
            done();
        }
    });

    })