let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.mul - multiply two positive real numbers', function(done) {
        let a = new complex_js(3, 0);
        let b = new complex_js(4, 0);
        let result = complex_js.ZERO.mul(a, b);
        assert.equal(result.re, 12);
        assert.equal(result.im, 0);
        done();
    });

    })