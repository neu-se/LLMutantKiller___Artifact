The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.then - progress case', function(done) {
        let resolver;
        let progressValues = [];
        let promise = q.makePromise(function(resolve, reject, notify) {
            resolver = { resolve, reject, notify };
        });
        
        promise.then(function(value) {
            assert.equal(value, 'final');
            assert.deepEqual(progressValues, [10, 50, 90]);
            done();
        }, function(error) {
            done(error);
        }, function(progress) {
            progressValues.push(progress);
        });
        
        resolver.notify(10);
        resolver.notify(50);
        resolver.notify(90);
        resolver.resolve('final');
    });
    
    })
``` 
failed with the following error message:
```
Cannot read properties of undefined (reading 'notify')  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.