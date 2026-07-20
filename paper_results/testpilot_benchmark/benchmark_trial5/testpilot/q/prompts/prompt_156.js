The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fcall with successful function', function(done) {
        // Create a simple function that adds two numbers
        function add(a, b) {
            return a + b;
        }
        
        // Create a promise using makePromise
        let promisifiedAdd = q.makePromise(add, function(a, b, callback) {
            try {
                let result = add(a, b);
                callback(null, result);
            } catch (error) {
                callback(error);
            }
        });
        
        // Test fcall with arguments
        promisifiedAdd.fcall(5, 3)
            .then(function(result) {
                assert.strictEqual(result, 8);
                done();
            })
            .catch(done);
    });
    
    })
``` 
failed with the following error message:
```
Function.prototype.apply was called on [object Object], which is an object and not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.