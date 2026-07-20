let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.toString', function(done) {
        // Test that ZERO.toString() returns "0"
        let result = complex_js.ZERO.toString();
        assert.strictEqual(result, "0");
        
        // Additional tests to verify the toString behavior with other values
        // Test pure real number
        let real = new complex_js(9, 0);
        assert.strictEqual(real.toString(), "9");
        
        // Test pure imaginary number
        let imaginary = new complex_js(0, 1);
        assert.strictEqual(imaginary.toString(), "i");
        
        // Test complex number with both real and imaginary parts
        let complex1 = new complex_js(1, 2);
        assert.strictEqual(complex1.toString(), "1 + 2i");
        
        // Test complex number with coefficient 1 for imaginary part
        let complex2 = new complex_js(1, 1);
        assert.strictEqual(complex2.toString(), "1 + i");
        
        // Test negative imaginary part
        let complex3 = new complex_js(1, -2);
        assert.strictEqual(complex3.toString(), "1 - 2i");
        
        // Test pure negative imaginary
        let negativeImaginary = new complex_js(0, -1);
        assert.strictEqual(negativeImaginary.toString(), "-i");
        
        done();
    });
});