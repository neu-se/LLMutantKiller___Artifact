The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - no arguments bound', function(done) {
        function asyncConcat(str1, str2, callback) {
            setTimeout(() => {
                callback(null, str1 + str2);
            }, 10);
        }
        
        let promiseConcat = q.makePromise(asyncConcat);
        let boundConcat = promiseConcat.fbind();
        
        boundConcat('Hello', ' World').then(result => {
            assert.equal(result, 'Hello World');
            done();
        }).catch(done);
    });
    
    })
``` 
failed with the following error message:
```
Function.prototype.apply was called on [object Object], which is an object and not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.