The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise with basic descriptor', function(done) {
        let descriptor = {
            when: function(rejected) {
                if (rejected) {
                    rejected(new Error('test error'));
                } else {
                    return 'resolved value';
                }
            }
        };
        
        let promise = q.makePromise(descriptor);
        
        promise.then(function(value) {
            assert.equal(value, 'resolved value');
            done();
        }).catch(done);
    });

    })
``` 
failed with the following error message:
```
test error  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.