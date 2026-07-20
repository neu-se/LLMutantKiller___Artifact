The test:
```
let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test plural.addRule with string replacement', function(done) {
        // Add a rule that replaces words ending with 'y' with 'ies'
        plural.addRule(/y$/i, 'ies');
        
        // Test the rule
        let result = plural('city');
        assert.equal(result, 'cities');
        
        done();
    });
    
    })
``` 
failed with the following error message:
```
'ies' == 'cities'  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.