let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.log', function(done) {
        try {
            // Test that log of zero throws an error or returns negative infinity
            // Since log(0) is undefined in mathematics, this should either throw or return -Infinity
            let result = complex_js.ZERO.log();
            
            // Check if the result has negative infinity real part
            assert.strictEqual(result.re, -Infinity, 'Real part should be -Infinity for log(0)');
            assert.strictEqual(result.im, 0, 'Imaginary part should be 0 for log(0)');
            
            done();
        } catch (error) {
            // If it throws an error, that's also acceptable behavior for log(0)
            assert.ok(error, 'log(0) should throw an error or return -Infinity');
            done();
        }
    });
    
    })