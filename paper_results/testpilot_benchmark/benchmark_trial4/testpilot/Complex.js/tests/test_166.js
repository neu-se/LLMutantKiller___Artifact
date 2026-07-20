let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sinh', function(done) {
        // Test sinh(0) = 0
        let result = complex_js.ZERO.sinh();
        assert.strictEqual(result.re, 0, 'Real part of sinh(0) should be 0');
        assert.strictEqual(result.im, 0, 'Imaginary part of sinh(0) should be 0');
        done();
    });

    })