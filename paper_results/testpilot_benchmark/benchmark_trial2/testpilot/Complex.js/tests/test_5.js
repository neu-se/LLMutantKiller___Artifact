let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sign', function(done) {
        try {
            // Test the sign of zero complex number
            let result = complex_js.ZERO.sign();
            
            // The sign of zero should result in NaN for both real and imaginary parts
            // since we're dividing 0/0
            assert(isNaN(result.re), 'Real part should be NaN');
            assert(isNaN(result.im), 'Imaginary part should be NaN');
            
            done();
        } catch (error) {
            done(error);
        }
    });
    
    })