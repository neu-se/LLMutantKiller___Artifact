The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.return with object value', function(done) {
        let testObj = { name: 'test', value: 123 };
        let promise = q.return(testObj);
        promise.then(function(value) {
            assert.deepStrictEqual(value, testObj);
            assert.strictEqual(value, testObj); // Should be the same reference
            done();
        }).catch(done);
    });

    })
``` 
failed with the following error message:
```
the object {
  "value": {
    "name": "test"
    "value": 123
  }
} was thrown, throw an Error :)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.