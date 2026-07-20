let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.acot', function(done) {
        // Test acot of zero (0 + 0i)
        // acot(0) should equal π/2
        let result = complex_js.ZERO.acot();
        
        // Helper function for approximate equality
        function assertApproximately(actual, expected, tolerance, message) {
            assert(Math.abs(actual - expected) < tolerance, message);
        }
        
        assertApproximately(result.re, Math.PI / 2, 1e-10, 'Real part should be π/2');
        assertApproximately(result.im, 0, 1e-10, 'Imaginary part should be 0');
        
        done();
    });
});