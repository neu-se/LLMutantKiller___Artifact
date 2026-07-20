let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sqrt', function(done) {
        // Test square root of zero
        let result = complex_js.ZERO.sqrt();
        assert.strictEqual(result.re, 0);
        assert.strictEqual(result.im, 0);
        done();
    });

    })