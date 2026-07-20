The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.spawn with generator that handles errors', function(done) {
        function* errorHandlingGenerator() {
            try {
                yield q.reject(new Error('test error'));
            } catch (e) {
                return 'caught: ' + e.message;
            }
        }
        
        q.spawn(errorHandlingGenerator)
            .then(function(result) {
                assert.equal(result, 'caught: test error');
                done();
            })
            .catch(done);
    });
    
    })
``` 
failed with the following error message:
```
Cannot read properties of undefined (reading 'then')  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.