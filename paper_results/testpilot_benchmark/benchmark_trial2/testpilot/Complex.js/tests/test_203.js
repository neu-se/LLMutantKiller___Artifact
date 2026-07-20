let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.acoth', function(done) {
        // Test acoth(0) = i*π/2
        let result = complex_js.ZERO.acoth();
        assert.strictEqual(result.re, 0, 'Real part should be 0');
        assert.strictEqual(result.im, Math.PI / 2, 'Imaginary part should be π/2');
        done();
    });

    })