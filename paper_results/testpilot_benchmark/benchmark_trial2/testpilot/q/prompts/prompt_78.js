The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.then - rejected case', function(done) {
        let resolver;
        let promise = q.makePromise(function(resolve, reject, notify) {
            resolver = { resolve, reject, notify };
        });
        
        promise.then(function(value) {
            done(new Error('Should not be fulfilled'));
        }, function(error) {
            assert.equal(error.message, 'test error');
            done();
        });
        
        resolver.reject(new Error('test error'));
    });
    
    })
``` 
failed with the following error message:
```
Cannot read properties of undefined (reading 'reject')  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.