The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.ninvoke - error callback', function(done) {
        // Create a mock object with a method that calls back with an error
        const mockObject = {
            errorMethod: function(callback) {
                setTimeout(() => {
                    callback(new Error('Test error'));
                }, 10);
            }
        };

        const promisedObject = q.makePromise(mockObject, function(name, args) {
            return q.Promise((resolve, reject) => {
                const callback = args[args.length - 1];
                const methodArgs = args.slice(0, -1);
                
                if (typeof mockObject[name] === 'function') {
                    mockObject[name].apply(mockObject, methodArgs.concat([callback]));
                } else {
                    callback(new Error('Method not found'));
                }
            });
        });

        promisedObject.ninvoke('errorMethod')
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
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_362.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.