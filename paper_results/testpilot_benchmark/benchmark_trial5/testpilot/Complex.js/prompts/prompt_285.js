The test:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.valueOf is consistent with toString', function(done) {
        // Test that valueOf() and toString() return the same result for ZERO
        let valueOfResult = complex_js.ZERO.valueOf();
        let toStringResult = complex_js.ZERO.toString();
        
        assert.strictEqual(valueOfResult, toStringResult);
        
        done();
    });

    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:

0 !== '0'
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.