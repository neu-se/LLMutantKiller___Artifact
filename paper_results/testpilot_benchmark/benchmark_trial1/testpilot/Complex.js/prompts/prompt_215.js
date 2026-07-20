The test:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.asech', function(done) {
        // Test that asech(0) returns infinity
        let result = complex_js.ZERO.asech();
        assert.strictEqual(result.re, Infinity);
        assert.strictEqual(result.im, 0);
        done();
    });

    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:

Infinity !== 0
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.