The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.spawn with generator that throws error', function(done) {
        function* errorGenerator() {
            yield q.resolve(1);
            throw new Error('Test error');
        }
        
        q.spawn(errorGenerator)
            .then(function() {
                done(new Error('Should have thrown an error'));
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
Cannot read properties of undefined (reading 'then')  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.