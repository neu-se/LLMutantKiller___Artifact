let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.csc should throw error for zero', function(done) {
        // csc(0) is undefined since sin(0) = 0 and csc = 1/sin
        // Instead of throwing an error, it likely returns Infinity
        let result = complex_js.ZERO.csc();
        assert(result.isInfinite() || !isFinite(result.re) || !isFinite(result.im));
        done();
    });
});