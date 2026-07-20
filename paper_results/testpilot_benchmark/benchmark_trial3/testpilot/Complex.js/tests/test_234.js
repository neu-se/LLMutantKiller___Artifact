let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.neg', function(done) {
        // Test that negating ZERO returns ZERO
        let result = complex_js.ZERO.neg();
        
        // ZERO should be (0, 0), so its negation should also be (0, 0)
        assert.strictEqual(result.re, 0, 'Real part of negated ZERO should be 0');
        assert.strictEqual(result.im, 0, 'Imaginary part of negated ZERO should be 0');
        
        // Test that the result is still a complex number
        assert.strictEqual(typeof result, 'object', 'Result should be an object');
        assert.strictEqual(result.constructor.name, 'Complex', 'Result should be a Complex number');
        
        done();
    });
    
    })