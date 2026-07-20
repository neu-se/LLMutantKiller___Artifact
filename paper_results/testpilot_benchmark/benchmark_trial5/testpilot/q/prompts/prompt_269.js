The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.npost - method with error', function(done) {
        let mockObject = {
            errorMethod: function(callback) {
                setTimeout(() => {
                    callback(new Error('Test error'));
                }, 10);
            }
        };
        
        let promisedObject = q.makePromise(mockObject, function(name, args) {
            return this[name].apply(this, args);
        });
        
        promisedObject.npost('errorMethod', [])
            .then(function() {
                done(new Error('Should have rejected'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'Test error');
                done();
            });
    });
    
    })
``` 
failed with the following error message:
```
  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.