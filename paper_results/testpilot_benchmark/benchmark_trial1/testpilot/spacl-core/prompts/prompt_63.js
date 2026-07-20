The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.clone with custom spec', function(done) {
        try {
            // Create a Rule instance with an initial regex
            const originalRule = new _spacl_core.Rule(/original/);
            
            // Clone with a different regex spec
            const customRegex = /custom\w*/;
            const clonedRule = originalRule.clone(customRegex);
            
            // Verify the clone is a different instance
            assert.notStrictEqual(originalRule, clonedRule);
            
            // Verify the clone is also a Rule instance
            assert(clonedRule instanceof _spacl_core.Rule);
            
            // Verify the clone has the custom regex, not the original
            assert.strictEqual(clonedRule.regex.toString(), customRegex.toString());
            assert.notStrictEqual(clonedRule.regex.toString(), originalRule.regex.toString());
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })
``` 
failed with the following error message:
```
spec.match is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.