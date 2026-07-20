let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO properties', function(done) {
        assert.strictEqual(complex_js.ZERO.re, 0, 'Real part should be 0');
        assert.strictEqual(complex_js.ZERO.im, 0, 'Imaginary part should be 0');
        done();
    });

    })