The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.clone with custom spec', function(done) {
        // Create a rule instance with an initial regex pattern
        let originalRule = new _spacl_core.Rule(/original/);
        
        // Clone the rule with a different regex spec
        let customRegex = /custom\w*/i;
        let clonedRule = originalRule.clone(customRegex);
        
        // Verify the clone is a different instance
        assert.notStrictEqual(originalRule, clonedRule);
        
        // Verify the clone has the custom regex pattern, not the original
        assert.strictEqual(clonedRule.regex.source, customRegex.source);
        assert.strictEqual(clonedRule.regex.flags, customRegex.flags);
        assert.notStrictEqual(clonedRule.regex.source, originalRule.regex.source);
        
        done();
    });

    })
``` 
failed with the following error message:
```
spec.match is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.