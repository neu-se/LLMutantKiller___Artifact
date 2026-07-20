The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.any - resolves with first resolved value', function(done) {
        let deferred1 = q.defer();
        let deferred2 = q.defer();
        let deferred3 = q.defer();
        
        let promises = [deferred1.promise, deferred2.promise, deferred3.promise];
        let arrayPromise = q.all(promises);
        
        arrayPromise.any().then(function(result) {
            assert.strictEqual(result, 'second');
            done();
        }).catch(done);
        
        // Resolve second promise first
        setTimeout(() => deferred2.resolve('second'), 10);
        setTimeout(() => deferred1.resolve('first'), 20);
        setTimeout(() => deferred3.resolve('third'), 30);
    });
    
    })
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_218.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.