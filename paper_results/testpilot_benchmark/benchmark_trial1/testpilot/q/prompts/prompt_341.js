The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.return returns a promise', function() {
        let promise = q.return('test');
        assert.strictEqual(typeof promise.then, 'function');
        assert.strictEqual(typeof promise.catch, 'function');
    });
});
``` 
failed with the following error message:
```
the object {
  "value": "test"
} was thrown, throw an Error :)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.