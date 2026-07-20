let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.log', function(done) {
        // Test log of zero - should return -Infinity + 0i
        let result = complex_js.ZERO.log();
        assert.strictEqual(result.re, -Infinity, 'Real part of log(0) should be -Infinity');
        assert.strictEqual(result.im, 0, 'Imaginary part of log(0) should be 0');
        done();
    });

    })