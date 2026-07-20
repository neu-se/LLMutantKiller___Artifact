let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.add with zero and a complex number', function(done) {
        let a = complex_js.ZERO;
        let b = new complex_js(5, -3);
        let result = a.add(b);
        assert.strictEqual(result.re, 5);
        assert.strictEqual(result.im, -3);
        done();
    });

    })