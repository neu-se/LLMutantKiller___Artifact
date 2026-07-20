The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.post - non-existent method', function(done) {
        let mockObject = {};
        
        let promisedObject = q.makePromise(mockObject, function(name, args) {
            if (!mockObject[name]) {
                throw new Error('Method not found: ' + name);
            }
            return mockObject[name].apply(mockObject, args);
        });
        
        promisedObject.post('nonExistentMethod', [])
            .then(function() {
                done(new Error('Should have thrown an error'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'Method not found: nonExistentMethod');
                done();
            });
    });
});
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_151.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.