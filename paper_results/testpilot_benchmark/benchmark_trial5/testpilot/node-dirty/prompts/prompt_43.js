The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter with default options', function(done) {
        let db = dirty.Dirty.EventEmitter();
        
        // Test that it's an EventEmitter instance
        assert(typeof db.on === 'function', 'Should have on method');
        assert(typeof db.emit === 'function', 'Should have emit method');
        assert(typeof db.removeListener === 'function', 'Should have removeListener method');
        
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