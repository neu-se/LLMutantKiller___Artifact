The test:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ONE.inverse should return ONE', function(done) {
        try {
            let result = complex_js.ONE.inverse();
            assert.strictEqual(result.re, 1);
            assert.strictEqual(result.im, 0);
            done();
        } catch (error) {
            done(error);
        }
    });

    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:
+ actual - expected

+ -0
- 0  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.