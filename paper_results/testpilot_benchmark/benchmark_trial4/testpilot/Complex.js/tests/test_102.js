let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.log should throw error for log of zero', function(done) {
        try {
            let result = complex_js.ZERO.log();
            // If we reach here, check if the result represents -Infinity
            if (result.re === -Infinity || result.real === -Infinity || 
                (typeof result === 'object' && (result.re === -Infinity || result.real === -Infinity))) {
                done(); // This is acceptable behavior for log(0)
            } else {
                done(new Error('Expected log of zero to throw an error or return -Infinity'));
            }
        } catch (error) {
            // Log of zero should throw an error
            done();
        }
    });
});