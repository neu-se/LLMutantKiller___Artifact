The test:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.floor', function(done) {
        // Test 1: Floor with no places argument (default to 0 decimal places)
        let result1 = complex_js.ZERO.floor();
        assert.strictEqual(result1.re, 0);
        assert.strictEqual(result1.im, 0);
        
        // Test 2: Floor with 0 places
        let result2 = complex_js.ZERO.floor(0);
        assert.strictEqual(result2.re, 0);
        assert.strictEqual(result2.im, 0);
        
        // Test 3: Floor with positive places
        let result3 = complex_js.ZERO.floor(2);
        assert.strictEqual(result3.re, 0);
        assert.strictEqual(result3.im, 0);
        
        // Test 4: Floor with negative places
        let result4 = complex_js.ZERO.floor(-1);
        assert.strictEqual(result4.re, 0);
        assert.strictEqual(result4.im, 0);
        
        // Test 5: Verify the result is a new Complex instance
        let result5 = complex_js.ZERO.floor(1);
        assert.notStrictEqual(result5, complex_js.ZERO);
        assert.strictEqual(result5.constructor.name, 'Complex');
        
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