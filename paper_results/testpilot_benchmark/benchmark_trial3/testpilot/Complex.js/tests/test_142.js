let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.acos', function(done) {
        // Test acos(0) = π/2
        let result = complex_js.ZERO.acos();
        assert.ok(Math.abs(result.re - Math.PI/2) < 1e-10, 'Real part should be π/2');
        assert.ok(Math.abs(result.im) < 1e-10, 'Imaginary part should be 0');
        done();
    });

    })