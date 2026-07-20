let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.isNaN', function(done) {
        // Test that ZERO is not NaN
        assert.strictEqual(complex_js.ZERO.isNaN(), false);
        done();
    });

    })