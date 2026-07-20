The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.ninvoke - method not found', function(done) {
        const mockObject = {
            existingMethod: function(callback) {
                callback(null, 'success');
            }
        };

        const promise = q.makePromise(mockObject);
        
        promise.ninvoke('nonExistentMethod')
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert(error instanceof TypeError);
                done();
            });
    });
});
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_350.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.