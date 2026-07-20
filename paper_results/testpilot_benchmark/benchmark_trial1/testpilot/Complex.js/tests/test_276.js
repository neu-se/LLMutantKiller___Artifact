let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.toString', function(done) {
        // Test that ZERO constant returns "0" when converted to string
        let result = complex_js.ZERO.toString();
        assert.strictEqual(result, '0');
        
        // Verify ZERO has real part 0 and imaginary part 0
        assert.strictEqual(complex_js.ZERO.re, 0);
        assert.strictEqual(complex_js.ZERO.im, 0);
        
        done();
    });
    
    })