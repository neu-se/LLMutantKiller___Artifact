The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fcall with multiple arguments', function(done) {
        // Create a function that concatenates strings
        function concatenate(str1, str2, str3) {
            return str1 + str2 + str3;
        }
        
        // Create a promise using makePromise
        let promiseFunction = q.makePromise(concatenate, function(str1, str2, str3, callback) {
            try {
                let result = concatenate(str1, str2, str3);
                callback(null, result);
            } catch (error) {
                callback(error);
            }
        });
        
        // Test fcall with multiple arguments
        promiseFunction.fcall('Hello', ' ', 'World')
            .then(function(result) {
                assert.strictEqual(result, 'Hello World');
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