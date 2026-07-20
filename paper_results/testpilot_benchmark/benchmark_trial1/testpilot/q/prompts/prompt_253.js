The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nbind - with pre-bound arguments', function(done) {
        function mockNodeFunction(prefix, suffix, value, callback) {
            setTimeout(() => {
                callback(null, prefix + value + suffix);
            }, 10);
        }
        
        const promiseFunc = q.makePromise(mockNodeFunction);
        const boundFunc = promiseFunc.nbind(null, 'Hello ', '!');
        
        boundFunc('World')
            .then(result => {
                assert.strictEqual(result, 'Hello World!');
                done();
            })
            .catch(done);
    });

    })
``` 
failed with the following error message:
```
callback.apply is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.