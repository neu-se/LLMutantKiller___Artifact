The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master with simple object', function(done) {
        let testObj = {
            getValue: function() {
                return 42;
            },
            getPromise: function() {
                return q.resolve('hello');
            }
        };
        
        let master = q.master(testObj);
        
        // Test that master returns promises for method calls
        master.getValue().then(function(result) {
            assert.equal(result, 42);
            return master.getPromise();
        }).then(function(result) {
            assert.equal(result, 'hello');
            done();
        }).catch(done);
    });
    
    })
``` 
failed with the following error message:
```
master.getValue is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.