The test:
```
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
        let result4 = complex_js.ZERO.round(1);
        assert.notStrictEqual(result4, complex_js.ZERO);
        assert.strictEqual(result4.constructor.name, 'Complex');
        
        done();
    });
    
    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:
+ actual - expected

+ 'Object'
- 'Complex'  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.