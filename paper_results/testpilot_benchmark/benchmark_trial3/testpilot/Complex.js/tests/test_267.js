let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.toString', function(done) {
        // Test the ZERO constant
        assert.equal(complex_js.ZERO.toString(), '0');
        
        // Test real numbers (imaginary part is 0)
        assert.equal(new complex_js(9, 0).toString(), '9');
        assert.equal(new complex_js(-5, 0).toString(), '-5');
        assert.equal(new complex_js(0, 0).toString(), '0');
        
        // Test pure imaginary numbers (real part is 0)
        assert.equal(new complex_js(0, 1).toString(), 'i');
        assert.equal(new complex_js(0, -1).toString(), '-i');
        assert.equal(new complex_js(0, 2).toString(), '2i');
        assert.equal(new complex_js(0, -3).toString(), '-3i');
        
        // Test complex numbers with both real and imaginary parts
        assert.equal(new complex_js(1, 2).toString(), '1 + 2i');
        assert.equal(new complex_js(1, 1).toString(), '1 + i');
        assert.equal(new complex_js(1, -1).toString(), '1 - i');
        assert.equal(new complex_js(1, -2).toString(), '1 - 2i');
        assert.equal(new complex_js(-1, 2).toString(), '-1 + 2i');
        assert.equal(new complex_js(-1, -2).toString(), '-1 - 2i');
        
        // Test edge cases with coefficient 1 for imaginary part
        assert.equal(new complex_js(5, 1).toString(), '5 + i');
        assert.equal(new complex_js(5, -1).toString(), '5 - i');
        assert.equal(new complex_js(-5, 1).toString(), '-5 + i');
        assert.equal(new complex_js(-5, -1).toString(), '-5 - i');
        
        done();
    });
});