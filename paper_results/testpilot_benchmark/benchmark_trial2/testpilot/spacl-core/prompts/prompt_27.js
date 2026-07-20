The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.allow - single verb', function(done) {
        // Create a new Rule instance
        let rule = new _spacl_core.Rule();
        
        // Test allowing a single verb
        let result = rule.allow('read');
        
        // Verify the verb was added
        assert.strictEqual(rule.verbs['read'], true);
        
        // Verify method returns the rule instance for chaining
        assert.strictEqual(result, rule);
        
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