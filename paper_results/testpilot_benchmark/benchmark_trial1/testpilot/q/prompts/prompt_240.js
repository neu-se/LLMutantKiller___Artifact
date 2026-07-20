The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify - error handling', function(done) {
        // Create a Node.js style function that can error
        function nodeStyleFunction(value, callback) {
            setTimeout(() => {
                if (value === 'error') {
                    callback(new Error('Test error'));
                } else {
                    callback(null, value);
                }
            }, 10);
        }

        const promise = q.makePromise(function(resolve, reject) {
            resolve('test');
        });

        const denodeified = promise.denodeify(nodeStyleFunction);
        
        denodeified('error')
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(err => {
                assert.strictEqual(err.message, 'Test error');
                done();
            });
    });

    })
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_294.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.