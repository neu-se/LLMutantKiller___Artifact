The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.isPromise', function(done) {
        // Test with actual Promise
        let promise = new Promise((resolve, reject) => {
            resolve('test');
        });
        assert.strictEqual(q.isPromise(promise), true);

        // Test with Q promise
        let qPromise = q.defer().promise;
        assert.strictEqual(q.isPromise(qPromise), true);

        // Test with resolved Q promise
        let resolvedPromise = q.resolve('value');
        assert.strictEqual(q.isPromise(resolvedPromise), true);

        // Test with rejected Q promise
        let rejectedPromise = q.reject(new Error('test error'));
        assert.strictEqual(q.isPromise(rejectedPromise), true);

        // Test with non-promise objects
        assert.strictEqual(q.isPromise({}), false);
        assert.strictEqual(q.isPromise([]), false);
        assert.strictEqual(q.isPromise('string'), false);
        assert.strictEqual(q.isPromise(123), false);
        assert.strictEqual(q.isPromise(null), false);
        assert.strictEqual(q.isPromise(undefined), false);
        assert.strictEqual(q.isPromise(function() {}), false);

        // Test with promise-like object (thenable)
        let thenable = {
            then: function(onResolve, onReject) {
                onResolve('value');
            }
        };
        assert.strictEqual(q.isPromise(thenable), false);

        done();
    });
});
``` 
failed with the following error message:
```
Expected values to be strictly equal:

false !== true
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.