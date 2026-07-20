let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.arg', function(done) {
        // Test that ZERO (0 + 0i) has argument 0
        let result = complex_js.ZERO.arg();
        assert.strictEqual(result, 0);
        done();
    });
    
    })