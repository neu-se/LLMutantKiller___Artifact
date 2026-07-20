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
                if (value < 0) {
                    callback(new Error('Negative value not allowed'));
                } else {
                    callback(null, value);
                }
            }, 10);
        }
        
        const promise = q.makePromise(nodeStyleFunction, function(resolver) {
            return function(value) {
                nodeStyleFunction(value, resolver);
            };
        });
        
        const denodeified = promise.denodeify();
        
        denodeified(-1)
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Negative value not allowed');
                done();
            });
    });
    
    })
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_301.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.