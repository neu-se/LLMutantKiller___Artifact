The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with rejection', function(done) {
        let descriptor = {
            fargs: function(shouldFail) {
                return [shouldFail];
            },
            fcall: function(args) {
                if (args[0]) {
                    throw new Error('Intentional failure');
                }
                return 'success';
            }
        };
        
        let promiseFunc = q.makePromise(descriptor);
        
        promiseFunc(true)
            .then(function(result) {
                done(new Error('Should have rejected'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'Intentional failure');
                done();
            });
    });
});
``` 
failed with the following error message:
```
promiseFunc is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.