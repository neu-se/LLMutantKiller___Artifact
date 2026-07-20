The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.spawn with generator that yields rejected promise', function(done) {
        function* rejectedPromiseGenerator() {
            yield q.resolve(1);
            yield q.reject(new Error('Rejected promise'));
            return 'should not reach here';
        }
        
        q.spawn(rejectedPromiseGenerator)
            .then(function(result) {
                done(new Error('Should have been rejected'));
            })
            .catch(function(error) {
                assert.equal(error.message, 'Rejected promise');
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