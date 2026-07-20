let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex number (0,2) inverse should return (0,-0.5)', function(done) {
        try {
            let complex = new complex_js(0, 2);
            let result = complex.inverse();
            assert.strictEqual(result.re, 0);
            assert.strictEqual(result.im, -0.5);
            done();
        } catch (error) {
            done(error);
        }
    });
})