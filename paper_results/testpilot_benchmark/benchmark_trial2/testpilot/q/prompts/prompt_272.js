The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.npost - method with multiple return values', function(done) {
        let mockObject = {
            multiValueMethod: function(callback) {
                setTimeout(() => {
                    callback(null, 'first', 'second', 'third');
                }, 10);
            }
        };
        
        let promisedObject = q.makePromise(mockObject, function(name, args) {
            return this[name].apply(this, args);
        });
        
        promisedObject.npost('multiValueMethod', [])
            .then(function(result) {
                // npost should return only the first non-error argument
                assert.equal(result, 'first');
                done();
            })
            .catch(done);
    });
    
    })
``` 
failed with the following error message:
```
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.