The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.return with undefined value', function(done) {
        let promise = q.return(undefined);
        promise.then(function(value) {
            assert.strictEqual(value, undefined);
            done();
        }).catch(done);
    });

    })
``` 
failed with the following error message:
```
the object {
  "value": [undefined]
} was thrown, throw an Error :)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.