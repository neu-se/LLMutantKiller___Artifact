The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.post - successful method call', function(done) {
        // Create a mock object with a method that accepts arguments
        let mockObject = {
            testMethod: function(arg1, arg2) {
                return arg1 + arg2;
            }
        };
        
        // Create a promise-wrapped version of the object
        let promisedObject = q.makePromise(mockObject, function(name, args) {
            return mockObject[name].apply(mockObject, args);
        });
        
        // Test the post method
        promisedObject.post('testMethod', [5, 3])
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
Cannot read properties of undefined (reading 'apply')  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.