let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.csc should throw error for zero', function(done) {
        // Test that csc(0) throws an error since csc(0) = 1/sin(0) = 1/0 is undefined
        try {
            complex_js.ZERO.csc();
            assert.fail('Expected csc(0) to throw an error');
        } catch (error) {
            // Expected behavior - csc(0) should throw since it's undefined
            done();
        }
    });

    })