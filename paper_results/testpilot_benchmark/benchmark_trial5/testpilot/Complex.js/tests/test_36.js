let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sub - subtract two positive real numbers', function(done) {
        let a = new complex_js(5, 0);
        let b = new complex_js(3, 0);
        let result = b.sub(a);
        assert.equal(result.re, -2);
        assert.equal(result.im, 0);
        done();
    });

})