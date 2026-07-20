let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sign', function(done) {
        // Test that ZERO.sign() returns 0
        let result = complex_js.ZERO.sign();
        assert.strictEqual(result, 0, 'ZERO.sign() should return 0');
        done();
    });

    })