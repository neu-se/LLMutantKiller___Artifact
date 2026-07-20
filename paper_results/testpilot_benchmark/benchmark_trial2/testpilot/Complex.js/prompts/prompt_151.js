The test:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.acot', function(done) {
        // Test acot of zero (0 + 0i)
        let result = complex_js.ZERO.acot();
        
        // acot(0) should be π/2
        assert.approximately(result.re, Math.PI / 2, 1e-10);
        assert.approximately(result.im, 0, 1e-10);
        
        done();
    });
    
    })
``` 
failed with the following error message:
```
assert.approximately is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.