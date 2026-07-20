let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sec', function(done) {
        try {
            // Test that calling sec() on ZERO throws an error
            // since sec(0) = 1/cos(0) = 1/1 = 1, but let's verify the actual behavior
            let result = complex_js.ZERO.sec();
            
            // sec(0) should equal 1 since cos(0) = 1 and sec(x) = 1/cos(x)
            assert.strictEqual(result.re, 1, 'Real part of sec(0) should be 1');
            assert.strictEqual(result.im, 0, 'Imaginary part of sec(0) should be 0');
            
            done();
        } catch (error) {
            done(error);
        }
    });
    
    })