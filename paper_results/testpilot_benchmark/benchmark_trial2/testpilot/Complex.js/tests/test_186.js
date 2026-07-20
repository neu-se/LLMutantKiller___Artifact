let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sech', function(done) {
        // Test sech(0) = 1
        let result = complex_js.ZERO.sech();
        assert.strictEqual(result.re, 1);
        assert.strictEqual(Math.abs(result.im), 0);
        done();
    });

})