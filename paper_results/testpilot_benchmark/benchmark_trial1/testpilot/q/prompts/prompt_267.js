The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.npost - method with multiple arguments', function(done) {
        let mockObject = {
            multiArgMethod: function(str, num, bool, callback) {
                setTimeout(() => {
                    callback(null, {
                        string: str,
                        number: num,
                        boolean: bool
                    });
                }, 10);
            }
        };
        
        let promisedObject = q.makePromise(mockObject, function(name, args) {
            return mockObject[name].apply(mockObject, args);
        });
        
        promisedObject.npost('multiArgMethod', ['hello', 42, true])
            .then(function(result) {
                assert.equal(result.string, 'hello');
                assert.equal(result.number, 42);
                assert.equal(result.boolean, true);
                done();
            })
            .catch(done);
    });
    
    })
``` 
failed with the following error message:
```
Cannot read properties of undefined (reading 'apply')  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.