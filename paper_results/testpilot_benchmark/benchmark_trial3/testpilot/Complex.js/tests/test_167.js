let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.cosh', function(done) {
        // Test cosh(0) = 1
        let result = complex_js.ZERO.cosh();
        assert.strictEqual(result.re, 1);
        assert.strictEqual(result.im, 0);
        done();
    });

    })