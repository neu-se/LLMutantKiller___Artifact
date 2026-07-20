let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.acot', function(done) {
        // Test acot(0) = π/2
        let result = complex_js.ZERO.acot();
        assert.ok(Math.abs(result.re - Math.PI / 2) < 1e-10);
        assert.ok(Math.abs(result.im - 0) < 1e-10);
        done();
    });
});