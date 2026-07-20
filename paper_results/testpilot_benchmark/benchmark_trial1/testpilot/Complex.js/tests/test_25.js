let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.add with negative numbers', function(done) {
        let result = complex_js.ZERO.add(new complex_js(-2, -5));
        assert.strictEqual(result.re, -2);
        assert.strictEqual(result.im, -5);
        done();
    });
})