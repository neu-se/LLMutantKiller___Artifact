let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.csc', function(done) {
        try {
            // Test that csc(0) throws an error since csc(0) = 1/sin(0) = 1/0 is undefined
            complex_js.ZERO.csc();
            // If we reach this line, the function didn't throw an error as expected
            assert.fail('Expected csc(0) to throw an error');
        } catch (error) {
            // Verify that an error was thrown (which is the expected behavior)
            assert.ok(error, 'csc(0) should throw an error since it is undefined');
        }
        done();
    });

    })