The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.ninvoke - successful callback', function(done) {
        // Create a mock object with a method that follows Node.js callback convention
        const mockObject = {
            testMethod: function(arg1, arg2, callback) {
                // Simulate async operation
                setTimeout(() => {
                    callback(null, arg1 + arg2);
                }, 10);
            }
        };

        // Create a promise from the mock object
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

        // Test ninvoke
        promisedObject.ninvoke('testMethod', 5, 3)
            .then(result => {
                assert.strictEqual(result, 8);
                done();
            })
            .catch(done);
    });

    })
``` 
failed with the following error message:
```
callback is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.