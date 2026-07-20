let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.valueOf', function(done) {
        // Test that ZERO.valueOf() returns the real part when imaginary part is 0
        let result = complex_js.ZERO.valueOf();
        assert.strictEqual(result, 0, 'ZERO.valueOf() should return 0');
        done();
    });

    })