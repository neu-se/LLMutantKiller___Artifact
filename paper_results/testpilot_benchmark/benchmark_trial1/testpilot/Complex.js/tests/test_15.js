let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.add', function(done) {
        // Test adding two finite real numbers
        let result1 = complex_js.ZERO.add(3, 4);
        assert.strictEqual(result1.re, 3);
        assert.strictEqual(result1.im, 4);

        // Test adding zero to zero
        let result2 = complex_js.ZERO.add(0, 0);
        assert.strictEqual(result2.re, 0);
        assert.strictEqual(result2.im, 0);

        // Test adding negative numbers
        let result3 = complex_js.ZERO.add(-2, -5);
        assert.strictEqual(result3.re, -2);
        assert.strictEqual(result3.im, -5);

        // Test adding mixed positive and negative
        let result4 = complex_js.ZERO.add(1, -3);
        assert.strictEqual(result4.re, 1);
        assert.strictEqual(result4.im, -3);

        // Test adding decimal numbers
        let result5 = complex_js.ZERO.add(1.5, 2.7);
        assert.approximately(result5.re, 1.5, 0.0001);
        assert.approximately(result5.im, 2.7, 0.0001);

        done();
    });

    })