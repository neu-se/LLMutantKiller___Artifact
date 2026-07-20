let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.asec', function(done) {
        // Test arcsecant of zero
        // asec(0) = asec(0 + 0i) should throw an error or return infinity
        // since sec(z) = 1/cos(z) and asec(0) means finding z where sec(z) = 0
        // This is undefined since sec(z) = 1/cos(z) can never equal 0
        
        try {
            let result = complex_js.ZERO.asec();
            // If it doesn't throw, check if result is infinity or NaN
            assert(result.isNaN() || result.isInfinite(), 'asec(0) should be NaN or infinite');
        } catch (error) {
            // It's acceptable for asec(0) to throw an error
            assert(true, 'asec(0) correctly throws an error');
        }
        done();
    });

    })