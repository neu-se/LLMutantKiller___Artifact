The test:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.add with two positive real numbers', function(done) {
        let a = new complex_js(3, 0);
        let b = new complex_js(5, 0);
        let result = complex_js.ZERO.add(a, b);
        assert.equal(result.re, 8);
        assert.equal(result.im, 0);
        done();
    });

    })
``` 
failed with the following error message:
```
3 == 8  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.