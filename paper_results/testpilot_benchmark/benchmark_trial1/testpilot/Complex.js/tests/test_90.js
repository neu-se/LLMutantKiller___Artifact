let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.expm1', function(done) {
        // Test expm1 for zero - should return 0 since e^0 - 1 = 1 - 1 = 0
        let result = complex_js.ZERO.expm1();
        assert.strictEqual(result.re, 0);
        assert.strictEqual(result.im, 0);
        done();
    });

    })