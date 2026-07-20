let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sqrt', function(done) {
        // Test sqrt of zero (0 + 0i)
        let result = complex_js.ZERO.sqrt();
        assert.strictEqual(result.re, 0, 'Real part of sqrt(0) should be 0');
        assert.strictEqual(result.im, 0, 'Imaginary part of sqrt(0) should be 0');
        done();
    });

    })