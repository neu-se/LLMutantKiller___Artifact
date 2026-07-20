The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.return with string value', function(done) {
        let promise = q.return('hello world');
        promise.then(function(value) {
            assert.strictEqual(value, 'hello world');
            done();
        }).catch(done);
    });

    })
``` 
failed with the following error message:
```
the object {
  "value": "hello world"
} was thrown, throw an Error :)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.