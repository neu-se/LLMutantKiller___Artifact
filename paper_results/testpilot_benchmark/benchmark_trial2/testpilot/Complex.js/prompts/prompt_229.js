The test:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test ZERO conjugate returns same as ZERO', function(done) {
        // Test that conjugate of zero equals zero
        let zero = complex_js.ZERO;
        let conjugate = zero.conjugate();
        
        assert.strictEqual(conjugate.re, zero.re, 'Real parts should be equal');
        assert.strictEqual(conjugate.im, zero.im, 'Imaginary parts should be equal');
        
        done();
    });
    
    })
``` 
failed with the following error message:
```
Imaginary parts should be equal  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.