The test:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.cos', function(done) {
        // Test cos(0) = 1
        let result = complex_js.ZERO.cos();
        assert.strictEqual(result.re, 1, 'Real part of cos(0) should be 1');
        assert.strictEqual(result.im, 0, 'Imaginary part of cos(0) should be 0');
        done();
    });

    })
``` 
failed with the following error message:
```
Imaginary part of cos(0) should be 0  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.