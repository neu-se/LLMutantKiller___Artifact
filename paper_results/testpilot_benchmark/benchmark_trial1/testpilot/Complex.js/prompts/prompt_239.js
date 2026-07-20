The test:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.neg', function(done) {
        // Test that negating ZERO returns ZERO
        let negatedZero = complex_js.ZERO.neg();
        
        // ZERO should have real and imaginary parts equal to 0
        assert.strictEqual(negatedZero.re, 0, 'Real part of negated zero should be 0');
        assert.strictEqual(negatedZero.im, 0, 'Imaginary part of negated zero should be 0');
        
        // Verify it's still a Complex object
        assert.ok(negatedZero instanceof complex_js, 'Negated zero should be a Complex instance');
        
        done();
    });
    
    })
``` 
failed with the following error message:
```
Real part of negated zero should be 0  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.