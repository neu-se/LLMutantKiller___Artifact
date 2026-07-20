The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.master with method that throws error', function(done) {
        let testObj = {
            throwError: function() {
                throw new Error('test error');
            }
        };
        
        let master = q.master(testObj);
        
        master.throwError().then(function() {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.equal(error.message, 'test error');
            done();
        });
    });
    
    })
``` 
failed with the following error message:
```
master.throwError is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.