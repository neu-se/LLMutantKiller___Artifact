let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.ceil with default places', function(done) {
        // Test ceil with default places (0)
        let result = complex_js.ZERO.ceil();
        assert.strictEqual(result.re, 0);
        assert.strictEqual(result.im, 0);
        done();
    });

    })