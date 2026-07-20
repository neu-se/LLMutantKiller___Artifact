let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.toString', function(done) {
        // Test ZERO constant
        assert.equal(complex_js.ZERO.toString(), '0');
        
        // Test real numbers
        assert.equal(new complex_js(9, 0).toString(), '9');
        assert.equal(new complex_js(-5, 0).toString(), '-5');
        assert.equal(new complex_js(0, 0).toString(), '0');
        
        // Test pure imaginary numbers
        assert.equal(new complex_js(0, 1).toString(), 'i');
        assert.equal(new complex_js(0, -1).toString(), '-i');
        assert.equal(new complex_js(0, 2).toString(), '2i');
        assert.equal(new complex_js(0, -3).toString(), '-3i');
        
        // Test complex numbers with both real and imaginary parts
        assert.equal(new complex_js(1, 2).toString(), '1 + 2i');
        assert.equal(new complex_js(1, 1).toString(), '1 + i');
        assert.equal(new complex_js(1, -1).toString(), '1 - i');
        assert.equal(new complex_js(3, -4).toString(), '3 - 4i');
        assert.equal(new complex_js(-2, 5).toString(), '-2 + 5i');
        assert.equal(new complex_js(-2, -5).toString(), '-2 - 5i');
        
        // Test edge cases with coefficient 1 and -1
        assert.equal(new complex_js(1, -1).toString(), '1 - i');
        assert.equal(new complex_js(-1, 1).toString(), '-1 + i');
        assert.equal(new complex_js(-1, -1).toString(), '-1 - i');
        
        done();
    });
});