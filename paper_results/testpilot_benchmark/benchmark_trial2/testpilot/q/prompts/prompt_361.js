The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.dispatch with method call', function(done) {
        let testObject = {
            add: function(a, b) {
                return a + b;
            },
            multiply: function(a, b) {
                return a * b;
            }
        };
        
        q.dispatch(testObject, 'add', [5, 3])
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
Promise does not support operation: add  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.