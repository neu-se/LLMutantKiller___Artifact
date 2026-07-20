The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter with custom options', function(done) {
        let opts = { path: ':memory:' };
        let db = dirty.Dirty.EventEmitter(opts);
        
        // Test that it accepts options
        assert(typeof db.on === 'function', 'Should have on method');
        assert(typeof db.emit === 'function', 'Should have emit method');
        
        done();
    });

    })
``` 
failed with the following error message:
```
Cannot read properties of undefined (reading 'on')  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.