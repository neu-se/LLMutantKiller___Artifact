let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test csc of non-zero complex numbers', function(done) {
        try {
            // Test csc(π/2) = 1/sin(π/2) = 1/1 = 1
            let halfPi = new complex_js(Math.PI / 2, 0);
            let result1 = halfPi.csc();
            assert(Math.abs(result1.re - 1) < 1e-10, 'csc(π/2) real part should be approximately 1');
            assert(Math.abs(result1.im) < 1e-10, 'csc(π/2) imaginary part should be approximately 0');

            // Test csc(π/6) = 1/sin(π/6) = 1/(1/2) = 2
            let piSixth = new complex_js(Math.PI / 6, 0);
            let result2 = piSixth.csc();
            assert(Math.abs(result2.re - 2) < 1e-10, 'csc(π/6) real part should be approximately 2');
            assert(Math.abs(result2.im) < 1e-10, 'csc(π/6) imaginary part should be approximately 0');

            done();
        } catch (error) {
            done(error);
        }
    });

    })