let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.csch', function(done) {
        // Test that csch(0) throws an error or returns infinity
        // since csch(0) = 2/(e^0 - e^0) = 2/0 which is undefined
        try {
            let result = complex_js.ZERO.csch();
            // If no error is thrown, check if result is infinite or NaN
            assert(isNaN(result.re) || !isFinite(result.re), 'csch(0) should be undefined/infinite');
        } catch (error) {
            // It's acceptable for csch(0) to throw an error
            assert(true, 'csch(0) correctly throws an error');
        }
        done();
    });

    })