let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.isNaN - should return false for ZERO', function(done) {
        // ZERO is a valid complex number (0 + 0i), so isNaN should return false
        let result = complex_js.ZERO.isNaN();
        assert.strictEqual(result, false);
        done();
    });

    })