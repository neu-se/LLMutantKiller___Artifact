The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.denodeify - with context binding', function(done) {
        // Create an object with a method that uses 'this'
        const testObject = {
            prefix: 'Object: ',
            nodeMethod: function(value, callback) {
                setTimeout(() => {
                    callback(null, this.prefix + value);
                }, 10);
            }
        };

        const promise = q.makePromise(function(resolve, reject) {
            resolve('test');
        });

        const denodeified = promise.denodeify(testObject.nodeMethod, testObject);
        
        denodeified('hello')
            .then(result => {
                assert.strictEqual(result, 'Object: hello');
                done();
            })
            .catch(done);
    });
});
``` 
failed with the following error message:
```
Function.prototype.apply was called on [object Object], which is an object and not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.