The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.race - handles single promise', function(done) {
        let deferred = q.defer();
        
        q.makePromise.prototype.race.call({}, [deferred.promise]).then(function(result) {
            assert.strictEqual(result, 'single result');
            done();
        }).catch(done);
        
        setTimeout(() => deferred.resolve('single result'), 10);
    });
    
    })
``` 
failed with the following error message:
```
this.then is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.