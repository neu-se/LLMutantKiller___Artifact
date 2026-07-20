let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.inverse should throw error', function(done) {
        try {
            complex_js.ZERO.inverse();
            // If we reach here, the test should fail because inverse of zero should throw an error
            done(new Error('Expected inverse of zero to throw an error'));
        } catch (error) {
            // This is expected behavior - inverse of zero should throw an error
            done();
        }
    });

    })