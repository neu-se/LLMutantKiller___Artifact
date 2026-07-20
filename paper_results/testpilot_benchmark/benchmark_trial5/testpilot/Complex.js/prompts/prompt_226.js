The test:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex number (0,2) inverse should return (0,-0.25)', function(done) {
        try {
            let complex = new complex_js(0, 2);
            let result = complex.inverse();
            assert.strictEqual(result.re, 0);
            assert.strictEqual(result.im, -0.25);
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

-0.5 !== -0.25
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.