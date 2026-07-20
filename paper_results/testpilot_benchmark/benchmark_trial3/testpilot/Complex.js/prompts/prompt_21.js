The test:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.add with negative numbers', function(done) {
        let result = complex_js.ZERO.add(-2, -5);
        assert.strictEqual(result.re, -7);
        assert.strictEqual(result.im, 0);
        done();
    });

    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:

-2 !== -7
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.