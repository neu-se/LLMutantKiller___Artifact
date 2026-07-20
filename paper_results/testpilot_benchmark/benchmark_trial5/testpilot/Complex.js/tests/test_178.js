let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.tanh', function(done) {
        // Test tanh(0) = 0
        let result = complex_js.ZERO.tanh();
        assert.strictEqual(result.re, 0, 'Real part of tanh(0) should be 0');
        assert.strictEqual(result.im, 0, 'Imaginary part of tanh(0) should be 0');
        done();
    });

    })