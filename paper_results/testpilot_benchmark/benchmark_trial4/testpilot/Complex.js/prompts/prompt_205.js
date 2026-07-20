The test:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.acoth', function(done) {
        // Test acoth(0) which should be infinity
        let result = complex_js.ZERO.acoth();
        
        // acoth(0) = infinity, so we expect the real part to be infinite
        assert.strictEqual(result.re, Infinity);
        assert.strictEqual(result.im, 0);
        
        done();
    });
    
    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:

0 !== Infinity
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.