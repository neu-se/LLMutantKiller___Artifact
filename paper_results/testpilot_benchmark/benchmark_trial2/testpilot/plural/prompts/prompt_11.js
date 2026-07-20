The test:
```
let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test plural.addRule with function as result', function(done) {
        // Add a rule that uses a function to transform the word
        plural.addRule(/man$/, function(match, word) {
            return word.replace(/man$/, 'men');
        });
        
        let result = plural('woman');
        assert.equal(result, 'women');
        
        done();
    });

    })
``` 
failed with the following error message:
```
word.replace is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.