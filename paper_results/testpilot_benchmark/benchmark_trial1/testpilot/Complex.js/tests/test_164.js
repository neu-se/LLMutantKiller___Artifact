let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.acsc', function(done) {
        // Test acsc(0) = π/2 + i∞
        let result = complex_js.ZERO.acsc();
        assert.strictEqual(result.re, Math.PI / 2);
        assert.strictEqual(result.im, Infinity);
        done();
    });

    })