The test:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.csc should throw error for zero', function(done) {
        // csc(0) is undefined since csc(z) = 1/sin(z) and sin(0) = 0
        assert.throws(() => {
            complex_js.ZERO.csc();
        }, Error);
        done();
    });
    
    })
``` 
failed with the following error message:
```
Missing expected exception (Error).  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.