let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.log should throw error for log of zero', function(done) {
        try {
            let result = complex_js.ZERO.log();
            // If we reach here, the function didn't throw an error
            done(new Error('Expected log of zero to throw an error'));
        } catch (error) {
            // Expected behavior - log of zero should throw an error
            done();
        }
    });

    })