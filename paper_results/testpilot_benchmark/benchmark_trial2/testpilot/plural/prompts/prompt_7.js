The test:
```
let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test plural.addRule with case insensitive matching', function(done) {
        // Add a rule for words ending in 'us' -> 'i'
        plural.addRule(/us$/i, 'i');
        
        let result1 = plural('cactus');
        let result2 = plural('FOCUS');
        assert.equal(result1, 'cacti');
        assert.equal(result2, 'FOCI');
        
        done();
    });
});
``` 
failed with the following error message:
```
'i' == 'cacti'  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.