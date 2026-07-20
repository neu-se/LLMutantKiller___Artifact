The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with basic descriptor', function(done) {
        // Create a simple descriptor that adds two numbers
        let descriptor = {
            fargs: function(a, b) {
                return [a, b];
            },
            fcall: function(args) {
                return args[0] + args[1];
            }
        };
        
        let promiseFunc = q.makePromise(descriptor);
        
        promiseFunc(5, 3)
            .then(function(result) {
                assert.equal(result, 8);
                done();
            })
            .catch(done);
    });

    })
``` 
failed with the following error message:
```
promiseFunc is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.