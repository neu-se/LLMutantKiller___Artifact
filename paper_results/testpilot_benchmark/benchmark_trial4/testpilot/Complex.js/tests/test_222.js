let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex number (1,1) inverse', function(done) {
        try {
            let complex = new complex_js(1, 1);
            let result = complex.inverse();
            // For (1+i), inverse is (1-i)/2 = (0.5, -0.5)
            assert.strictEqual(result.re, 0.5);
            assert.strictEqual(result.im, -0.5);
            done();
        } catch (error) {
            done(error);
        }
    });
});