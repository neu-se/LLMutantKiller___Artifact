The test:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test edge cases for ZERO.pow', function(done) {
        // Test with very small positive real exponent
        let result1 = complex_js.ZERO.pow(0.001, 0);
        assert.strictEqual(result1.re, 0);
        assert.strictEqual(result1.im, 0);

        // Test with large positive real exponent
        let result2 = complex_js.ZERO.pow(100, 0);
        assert.strictEqual(result2.re, 0);
        assert.strictEqual(result2.im, 0);

        // Test with pure imaginary exponent (non-zero)
        let result3 = complex_js.ZERO.pow(0, 2);
        assert.strictEqual(result3.re, 1);
        assert.strictEqual(result3.im, 0);

        done();
    });

    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:

NaN !== 1
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.