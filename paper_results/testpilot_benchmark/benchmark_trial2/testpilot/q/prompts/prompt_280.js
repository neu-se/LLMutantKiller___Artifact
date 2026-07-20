The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test ninvoke with no additional arguments', function(done) {
        let mockObject = {
            ping: function(callback) {
                setTimeout(() => {
                    callback(null, "pong");
                }, 5);
            }
        };

        let promiseObject = q.makePromise(mockObject, function(name, args) {
            return this[name].apply(this, args);
        });

        promiseObject.ninvoke("ping")
            .then(function(result) {
                assert.equal(result, "pong");
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