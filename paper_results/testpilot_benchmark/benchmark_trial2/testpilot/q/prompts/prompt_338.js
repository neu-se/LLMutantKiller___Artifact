The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.spawn with generator that throws unhandled error', function(done) {
        function* throwingGenerator() {
            yield q.resolve(1);
            throw new Error('unhandled error');
        }
        
        q.spawn(throwingGenerator)
            .then(function(result) {
                done(new Error('Should have rejected'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'unhandled error');
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