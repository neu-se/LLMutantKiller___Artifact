let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex number (2,0) inverse should return (0.5,0)', function(done) {
        try {
            let complex = new complex_js(2, 0);
            let result = complex.inverse();
            assert.strictEqual(result.re, 0.5);
            assert.strictEqual(result.im, 0);
            done();
        } catch (error) {
            done(error);
        }
    });
});