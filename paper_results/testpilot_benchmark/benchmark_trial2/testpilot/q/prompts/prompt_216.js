The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfapply - error callback', function(done) {
        // Create a mock function that simulates an error
        function mockErrorFunction(arg1, callback) {
            setTimeout(() => {
                callback(new Error('Test error'));
            }, 10);
        }
        
        let promisifiedFunction = q.denodeify(mockErrorFunction);
        
        // Test nfapply with error handling
        promisifiedFunction.nfapply(['test'])
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Test error');
                done();
            });
    });

    })
``` 
failed with the following error message:
```
promisifiedFunction.nfapply is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.