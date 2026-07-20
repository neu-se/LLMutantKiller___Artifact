let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.add with two real numbers', function(done) {
        let result = complex_js.ZERO.add(3, 4);
        assert.strictEqual(result.re, 7);
        assert.strictEqual(result.im, 0);
        done();
    });

    })