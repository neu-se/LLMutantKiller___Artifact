The test:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.add with zero and a complex number', function(done) {
        let a = complex_js.ZERO;
        let b = new complex_js(5, -3);
        let result = complex_js.ZERO.add(a, b);
        assert.strictEqual(result.re, 5);
        assert.strictEqual(result.im, -3);
        done();
    });

    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:

0 !== 5
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.