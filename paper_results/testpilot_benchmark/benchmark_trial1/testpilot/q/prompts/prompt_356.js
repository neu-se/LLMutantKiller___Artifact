The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.dispatch with method call', function(done) {
        let testObject = {
            getValue: function() {
                return 42;
            },
            add: function(a, b) {
                return a + b;
            }
        };
        
        q.dispatch(testObject, 'getValue', [])
            .then(function(result) {
                assert.equal(result, 42);
                done();
            })
            .catch(done);
    });
    
    })
``` 
failed with the following error message:
```
Promise does not support operation: getValue  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.