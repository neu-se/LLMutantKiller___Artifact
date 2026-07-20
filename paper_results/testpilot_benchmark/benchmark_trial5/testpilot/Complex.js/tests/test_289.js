let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.toVector', function(done) {
        // Test that ZERO.toVector() returns [0, 0]
        let result = complex_js.ZERO.toVector();
        assert.strictEqual(Array.isArray(result), true, 'toVector should return an array');
        assert.strictEqual(result.length, 2, 'toVector should return array of length 2');
        assert.strictEqual(result[0], 0, 'Real part should be 0');
        assert.strictEqual(result[1], 0, 'Imaginary part should be 0');
        done();
    });

    })