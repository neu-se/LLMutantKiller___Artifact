The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.allow - duplicate verbs', function(done) {
        // Create a new Rule instance
        let rule = new _spacl_core.Rule();
        
        // Add a verb first
        rule.allow('read');
        assert.strictEqual(rule.verbs['read'], true);
        
        // Add the same verb again
        rule.allow('read');
        
        // Verify it's still true (no change)
        assert.strictEqual(rule.verbs['read'], true);
        
        done();
    });

    })
``` 
failed with the following error message:
```
Cannot read properties of undefined (reading 'match')  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.