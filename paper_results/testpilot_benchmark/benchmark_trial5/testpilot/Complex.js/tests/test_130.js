let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sec', function(done) {
        // Test secant of zero
        // sec(0) = 1/cos(0) = 1/1 = 1
        let result = complex_js.ZERO.sec();
        assert.strictEqual(result.re, 1);
        assert.strictEqual(result.im, 0);
        done();
    });

    })