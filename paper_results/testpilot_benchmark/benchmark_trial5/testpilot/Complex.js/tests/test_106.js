let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.abs', function(done) {
        // Test that the magnitude of ZERO is 0
        let result = complex_js.ZERO.abs();
        assert.strictEqual(result, 0);
        done();
    });

    })