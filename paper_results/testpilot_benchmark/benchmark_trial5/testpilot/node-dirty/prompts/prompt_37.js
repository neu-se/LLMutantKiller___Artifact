The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter with null/undefined options', function(done) {
        let db1 = dirty.Dirty.EventEmitter(null);
        let db2 = dirty.Dirty.EventEmitter(undefined);
        
        // Test that null/undefined options don't break functionality
        assert(typeof db1.on === 'function', 'Should handle null options');
        assert(typeof db2.on === 'function', 'Should handle undefined options');
        
        done();
    });
});
``` 
failed with the following error message:
```
Cannot read properties of undefined (reading 'on')  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.