The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.race - rejects with first rejected promise', function(done) {
        let deferred1 = q.defer();
        let deferred2 = q.defer();
        let deferred3 = q.defer();
        
        let promises = [deferred1.promise, deferred2.promise, deferred3.promise];
        
        q.makePromise.prototype.race.call({}, promises).then(function(result) {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.strictEqual(error.message, 'first error');
            done();
        });
        
        // Reject the first promise first
        setTimeout(() => deferred1.reject(new Error('first error')), 10);
        setTimeout(() => deferred2.resolve('success'), 20);
        setTimeout(() => deferred3.resolve('another success'), 30);
    });
    
    })
``` 
failed with the following error message:
```
this.then is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.