The test:
```
let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.add with complex numbers', function(done) {
        let a = new complex_js(2, 3);
        let b = new complex_js(1, -2);
        let result = complex_js.ZERO.add(a, b);
        assert.strictEqual(result.re, 3);
        assert.strictEqual(result.im, 1);
        done();
    });

    })
``` 
failed with the following error message:
```
Expected values to be strictly equal:

0 !== 3
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.