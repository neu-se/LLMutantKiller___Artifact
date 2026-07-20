The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify with error callback', function(done) {
        // Create a mock node-style function that fails
        function nodeStyleFunction(value, callback) {
            setTimeout(() => {
                callback(new Error('Test error'));
            }, 10);
        }
        
        const promise = q.makePromise(nodeStyleFunction, function(value) {
            return [value];
        });
        const denodeified = promise.denodeify();
        
        denodeified(5)
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
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_290.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.