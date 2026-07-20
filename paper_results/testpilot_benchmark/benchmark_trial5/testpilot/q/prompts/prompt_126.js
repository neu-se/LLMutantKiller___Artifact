The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.post - method that throws error', function(done) {
        let mockObject = {
            throwError: function() {
                throw new Error('Test error');
            }
        };
        
        let promisedObject = q.makePromise(mockObject, function(name, args) {
            return mockObject[name].apply(mockObject, args);
        });
        
        promisedObject.post('throwError', [])
            .then(function() {
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
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_150.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.