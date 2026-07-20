The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.spawn with empty generator', function(done) {
        function* emptyGenerator() {
            return 'empty result';
        }
        
        q.spawn(emptyGenerator)
            .then(function(result) {
                assert.equal(result, 'empty result');
                done();
            })
            .catch(done);
    });
});
``` 
failed with the following error message:
```
Cannot read properties of undefined (reading 'then')  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.