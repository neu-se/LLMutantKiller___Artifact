let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.div - division by non-zero real number', function(done) {
        let result = complex_js.ZERO.div(5);
        assert.strictEqual(result.re, 0);
        assert.strictEqual(result.im, 0);
        done();
    });

    })