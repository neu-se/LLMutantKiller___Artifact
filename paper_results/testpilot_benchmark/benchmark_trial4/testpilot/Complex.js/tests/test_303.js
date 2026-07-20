let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.isInfinite should return false', function(done) {
        // Test that ZERO is not infinite
        assert.strictEqual(complex_js.ZERO.isInfinite(), false);
        done();
    });
    
    })