let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.isFinite', function(done) {
        // Test that ZERO is finite
        assert.strictEqual(complex_js.ZERO.isFinite(), true);
        done();
    });

    })