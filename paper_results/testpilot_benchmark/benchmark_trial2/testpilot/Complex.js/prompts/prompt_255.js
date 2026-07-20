The test:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.equals', function(done) {
        // Test ZERO equals itself
        assert.strictEqual(complex_js.ZERO.equals(complex_js.ZERO), true);
        
        // Test ZERO equals another zero complex number
        let zero = new complex_js(0, 0);
        assert.strictEqual(complex_js.ZERO.equals(zero), true);
        
        // Test ZERO does not equal a non-zero complex number
        let nonZero = new complex_js(1, 0);
        assert.strictEqual(complex_js.ZERO.equals(nonZero), false);
        
        // Test ZERO does not equal a complex number with imaginary part
        let imaginary = new complex_js(0, 1);
        assert.strictEqual(complex_js.ZERO.equals(imaginary), false);
        
        // Test ZERO does not equal a regular number
        assert.strictEqual(complex_js.ZERO.equals(5), false);
        
        // Test the special case mentioned in the note: Infinity
        assert.strictEqual(complex_js.ZERO.equals(Infinity), false);
        
        // Test ZERO does not equal a complex number with Infinity
        let infinityComplex = new complex_js(Infinity);
        assert.strictEqual(complex_js.ZERO.equals(infinityComplex), false);
        
        // Test ZERO does not equal null or undefined
        assert.strictEqual(complex_js.ZERO.equals(null), false);
        assert.strictEqual(complex_js.ZERO.equals(undefined), false);
        
        done();
    });
});
``` 
failed with the following error message:
```
Expected values to be strictly equal:

true !== false
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.