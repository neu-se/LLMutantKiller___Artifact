let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.round with positive places', function(done) {
        let result = complex_js.ZERO.round(2);
        assert.strictEqual(result.re, 0);
        assert.strictEqual(result.im, 0);
        assert(result instanceof complex_js);
        done();
    });

    })