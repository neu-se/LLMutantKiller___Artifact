The test:
```
let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.spawn with simple generator', function(done) {
        function* simpleGenerator() {
            yield 1;
            yield 2;
            return 3;
        }
        
        q.spawn(simpleGenerator)
            .then(function(result) {
                assert.equal(result, 3);
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