The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.ninvoke - error callback', function(done) {
        const mockObject = {
            errorMethod: function(callback) {
                setTimeout(() => {
                    callback(new Error('Test error'));
                }, 10);
            }
        };
        
        const promisifiedObject = q.makePromise(mockObject, function(name, args) {
            return q.Promise((resolve, reject) => {
                const callback = args[args.length - 1];
                const methodArgs = args.slice(0, -1);
                try {
                    this[name].apply(this, methodArgs.concat([callback]));
                } catch (error) {
                    reject(error);
                }
            });
        });
        
        promisifiedObject.ninvoke('errorMethod')
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
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.