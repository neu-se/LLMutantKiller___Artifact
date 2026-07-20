The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfapply - multiple return values', function(done) {
        function mockMultipleReturns(callback) {
            setTimeout(() => {
                callback(null, 'first', 'second', 'third');
            }, 10);
        }
        
        let promisifiedFn = q.denodeify(mockMultipleReturns);
        
        promisifiedFn.nfapply([])
            .then(result => {
                // Q typically returns only the first non-error argument
                assert.strictEqual(result, 'first');
                done();
            })
            .catch(done);
    });

    })
``` 
failed with the following error message:
```
promisifiedFn.nfapply is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.