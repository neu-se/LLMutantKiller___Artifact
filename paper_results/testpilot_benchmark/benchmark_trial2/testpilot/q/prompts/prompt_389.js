The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.post with mock object', function(done) {
        // Create a mock object with a post method
        let mockObject = {
            post: function(name, args) {
                return q.resolve({ name: name, args: args });
            }
        };
        
        q.post(mockObject, 'testMethod', ['arg1', 'arg2'])
            .then(function(result) {
                assert.equal(result.name, 'testMethod');
                assert.deepEqual(result.args, ['arg1', 'arg2']);
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