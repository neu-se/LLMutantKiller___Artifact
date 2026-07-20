The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.clone with default spec', function(done) {
        // Create a rule instance with a regex pattern
        let originalRule = new _spacl_core.Rule(/test\d+/);
        
        // Clone the rule using default spec (should use this.regex)
        let clonedRule = originalRule.clone();
        
        // Verify the clone is a different instance
        assert.notStrictEqual(originalRule, clonedRule);
        
        // Verify the clone has the same regex pattern
        assert.strictEqual(clonedRule.regex.source, originalRule.regex.source);
        assert.strictEqual(clonedRule.regex.flags, originalRule.regex.flags);
        
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