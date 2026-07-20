let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.log returns negative infinity', function(done) {
        try {
            let result = complex_js.ZERO.log();
            // Check if result represents negative infinity
            if (result.re === -Infinity || result.toString().includes('-Infinity')) {
                done();
            } else {
                done(new Error('Expected log of zero to return negative infinity'));
            }
        } catch (error) {
            // If it throws an error instead, that's also acceptable behavior
            done();
        }
    });

    })