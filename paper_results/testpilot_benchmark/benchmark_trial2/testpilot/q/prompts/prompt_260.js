The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind with no pre-bound arguments', function(done) {
        // Create a simple function
        function simpleFunction(name, callback) {
            setTimeout(() => {
                callback(null, `Hello, ${name}!`);
            }, 10);
        }
        
        // Bind without pre-arguments
        const boundFunction = q.makePromise(simpleFunction).nbind(null);
        
        boundFunction('World')
            .then(result => {
                assert.strictEqual(result, 'Hello, World!');
                done();
            })
            .catch(done);
    });
});
``` 
failed with the following error message:
```
callback.apply is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.