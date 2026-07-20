let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.valueOf returns consistent results', function(done) {
        let result1 = complex_js.ZERO.valueOf();
        let result2 = complex_js.ZERO.valueOf();
        
        // Test that multiple calls return equivalent values
        assert.strictEqual(result1.re, result2.re, 'real parts should be equal');
        assert.strictEqual(result1.im, result2.im, 'imaginary parts should be equal');
        
        done();
    });

    })