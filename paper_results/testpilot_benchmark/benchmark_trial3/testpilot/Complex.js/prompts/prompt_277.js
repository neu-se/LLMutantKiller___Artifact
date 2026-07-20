The test:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.valueOf returns zero values', function(done) {
        let result = complex_js.ZERO.valueOf();
        
        // Test that both real and imaginary parts are zero
        assert.strictEqual(result.re, 0, 'real part should be 0');
        assert.strictEqual(result.im, 0, 'imaginary part should be 0');
        
        done();
    });

    })
``` 
failed with the following error message:
```
real part should be 0  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.