The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.invoke - method that throws error', function(done) {
        let testObj = {
            throwError: function() {
                throw new Error('Test error');
            }
        };
        
        let promise = q.makePromise(testObj);
        
        promise.invoke('throwError')
            .then(function(result) {
                done(new Error('Should have thrown an error'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'Test error');
                done();
            });
    });

    })
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_161.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.