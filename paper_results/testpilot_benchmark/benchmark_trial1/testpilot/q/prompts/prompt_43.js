The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.join with mixed values and promises', function(done) {
        let promise1 = q.resolve('hello');
        let value2 = ' world';
        
        q.join(promise1, value2, function(str1, str2) {
            return str1 + str2;
        }).then(function(result) {
            assert.equal(result, 'hello world');
            done();
        }).catch(done);
    });
    
    })
``` 
failed with the following error message:
```
Q can't join: not the same: hello  world  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.