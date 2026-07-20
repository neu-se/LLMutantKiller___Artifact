The test:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.sign', function(done) {
        // Test that the sign of zero returns zero
        let result = complex_js.ZERO.sign();
        assert.strictEqual(result.re, 0, 'Real part of ZERO.sign() should be 0');
        assert.strictEqual(result.im, 0, 'Imaginary part of ZERO.sign() should be 0');
        done();
    });

    })
``` 
failed with the following error message:
```
Real part of ZERO.sign() should be 0  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.