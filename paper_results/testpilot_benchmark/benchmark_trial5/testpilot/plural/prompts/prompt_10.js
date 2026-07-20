The test:
```
let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test plural.addRule with complex pattern', function(done) {
        // Add a rule for words ending in 'f' or 'fe' -> 'ves'
        plural.addRule(/f(e)?$/, 'ves');
        
        // Test with 'f' ending
        let result1 = plural('leaf');
        assert.equal(result1, 'leaves');
        
        // Test with 'fe' ending
        let result2 = plural('knife');
        assert.equal(result2, 'knives');
        
        done();
    });

    })
``` 
failed with the following error message:
```
'ves' == 'leaves'  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.