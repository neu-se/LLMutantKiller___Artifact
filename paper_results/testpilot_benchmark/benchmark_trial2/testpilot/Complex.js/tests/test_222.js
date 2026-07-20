let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.inverse', function(done) {
        // Test that the inverse of ZERO returns INFINITY
        let result = complex_js.ZERO.inverse();
        assert.strictEqual(result, complex_js.INFINITY);
        done();
    });
    
    })