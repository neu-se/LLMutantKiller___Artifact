The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.npost - nonexistent method', function(done) {
        let mockObject = {};
        
        let promisedObject = q.makePromise(mockObject, function(name, args) {
            return this[name].apply(this, args);
        });
        
        promisedObject.npost('nonexistentMethod', [])
            .then(function() {
                done(new Error('Should have rejected'));
            })
            .catch(function(error) {
                assert(error instanceof TypeError);
                done();
            });
    });
});
``` 
failed with the following error message:
```
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.