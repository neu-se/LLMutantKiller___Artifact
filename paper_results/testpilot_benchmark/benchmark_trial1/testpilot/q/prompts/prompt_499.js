The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q functionality still works after noConflict', function(done) {
        // Call noConflict and get the returned q reference
        let qRef = q.noConflict();
        
        // Test that q functionality still works
        let deferred = qRef.defer();
        let promise = deferred.promise;
        
        promise.then(function(value) {
            assert.strictEqual(value, 'test value');
            done();
        }).catch(done);
        
        // Resolve the promise
        deferred.resolve('test value');
    });
});
``` 
failed with the following error message:
```
Q.noConflict only works when Q is used as a global  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.