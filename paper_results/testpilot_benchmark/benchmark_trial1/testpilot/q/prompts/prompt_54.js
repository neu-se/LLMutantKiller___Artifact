The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.join - both promises resolve', function(done) {
        let promise1 = q.resolve(42);
        let promise2 = q.resolve('hello');
        
        promise1.join(promise2).then(function(results) {
            assert.strictEqual(Array.isArray(results), true);
            assert.strictEqual(results.length, 2);
            assert.strictEqual(results[0], 42);
            assert.strictEqual(results[1], 'hello');
            done();
        }).catch(done);
    });

    })
``` 
failed with the following error message:
```
Q can't join: not the same: 42 hello  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.