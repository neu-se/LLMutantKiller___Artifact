let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.toVector returns correct vector representation', function(done) {
        // Test that ZERO constant returns [0, 0] as vector
        let result = complex_js.ZERO.toVector();
        assert.strictEqual(Array.isArray(result), true, 'toVector should return an array');
        assert.strictEqual(result.length, 2, 'Vector should have length 2');
        assert.strictEqual(result[0], 0, 'Real part should be 0');
        assert.strictEqual(result[1], 0, 'Imaginary part should be 0');
        done();
    });

    })