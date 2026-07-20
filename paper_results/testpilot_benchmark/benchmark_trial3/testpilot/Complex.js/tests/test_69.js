let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex number creation and basic properties', function(done) {
        // Verify ZERO is actually zero
        assert.strictEqual(complex_js.ZERO.re, 0);
        assert.strictEqual(complex_js.ZERO.im, 0);
        
        // Verify ONE exists and is 1+0i
        assert.strictEqual(complex_js.ONE.re, 1);
        assert.strictEqual(complex_js.ONE.im, 0);

        done();
    });

    })