The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.deny with single verb', function(done) {
        try {
            let rule = new _spacl_core.Rule();
            let result = rule.deny('read');
            
            // Verify the rule object is returned for chaining
            assert.strictEqual(result, rule);
            
            // Verify the deny method was called and configured properly
            assert(rule.verbs || rule._verbs || rule.deniedVerbs);
            done();
        } catch (error) {
            done(error);
        }
    });

    })
``` 
failed with the following error message:
```
Cannot read properties of undefined (reading 'match')  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.