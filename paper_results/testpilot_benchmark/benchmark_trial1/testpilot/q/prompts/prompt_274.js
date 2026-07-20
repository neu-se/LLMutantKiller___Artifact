The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.ninvoke - method not found', function(done) {
        const mockObject = {};

        const promisifiedObject = q.makePromise(mockObject, function(name, args) {
            return q.Promise((resolve, reject) => {
                const callback = args[args.length - 1];
                callback(new Error('Method not found'));
            });
        });

        promisifiedObject.ninvoke('nonExistentMethod')
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'Method not found');
                done();
            });
    });

    })
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_355.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.