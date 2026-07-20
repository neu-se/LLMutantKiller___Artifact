let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.add with mixed real and complex', function(done) {
        let a = 4;
        let b = new complex_js(0, 2);
        let result = complex_js.ZERO.add(a).add(b);
        assert.strictEqual(result.re, 4);
        assert.strictEqual(result.im, 2);
        done();
    });
});