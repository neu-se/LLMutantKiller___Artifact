let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.round', function(done) {
        // Test rounding ZERO with default places (0)
        let result1 = complex_js.ZERO.round();
        assert.strictEqual(result1.re, 0);
        assert.strictEqual(result1.im, 0);
        
        // Test rounding ZERO with 2 decimal places
        let result2 = complex_js.ZERO.round(2);
        assert.strictEqual(result2.re, 0);
        assert.strictEqual(result2.im, 0);
        
        // Test rounding ZERO with negative places
        let result3 = complex_js.ZERO.round(-1);
        assert.strictEqual(result3.re, 0);
        assert.strictEqual(result3.im, 0);
        
        // Test that the result is a new Complex instance
        assert.notStrictEqual(result1, complex_js.ZERO);
        assert.ok(result1 instanceof complex_js);
        
        done();
    });
    
    })