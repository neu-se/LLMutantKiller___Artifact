let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.valueOf', function(done) {
        // Test that ZERO (0 + 0i) returns 0 since imaginary part is 0
        let result = complex_js.ZERO.valueOf();
        assert.strictEqual(result, 0);
        done();
    });

    })