The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.ninvoke - no additional arguments', function(done) {
        const mockObject = {
            noArgsMethod: function(callback) {
                setTimeout(() => {
                    callback(null, 'success');
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
        
        promisifiedObject.ninvoke('noArgsMethod')
            .then(result => {
                assert.strictEqual(result, 'success');
                done();
            })
            .catch(done);
    });
});
``` 
failed with the following error message:
```
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.