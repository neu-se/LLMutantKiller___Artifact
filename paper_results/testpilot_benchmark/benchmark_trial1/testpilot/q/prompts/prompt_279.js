The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.ninvoke with error callback', function(done) {
        const mockObject = {
            failingMethod: function(callback) {
                setTimeout(() => {
                    callback(new Error('Something went wrong'));
                }, 10);
            }
        };

        const promise = q.makePromise(mockObject);
        
        promise.ninvoke('failingMethod')
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Something went wrong');
                done();
            });
    });

    })
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_349.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.