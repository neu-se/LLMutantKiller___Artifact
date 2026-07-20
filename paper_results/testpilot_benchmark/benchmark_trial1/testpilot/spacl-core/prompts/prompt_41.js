The test:
```
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.deny method chaining', function(done) {
        try {
            let rule = new _spacl_core.Rule();
            
            // Test that deny returns the rule object for method chaining
            let chainedResult = rule.deny('read').deny('write');
            assert.strictEqual(chainedResult, rule);
            
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