The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.join with resolved promises', function(done) {
        let promise1 = q.resolve(10);
        let promise2 = q.resolve(20);
        
        q.join(promise1, promise2, function(val1, val2) {
            return val1 + val2;
        }).then(function(result) {
            assert.equal(result, 30);
            done();
        }).catch(done);
    });
    
    })
``` 
failed with the following error message:
```
Q can't join: not the same: 10 20  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.