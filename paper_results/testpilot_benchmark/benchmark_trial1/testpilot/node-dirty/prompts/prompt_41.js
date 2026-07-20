The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter - with options', function(done) {
        let opts = { maxListeners: 20 };
        let db = dirty.Dirty.EventEmitter(opts);
        assert(db, 'EventEmitter should be created with options');
        assert.strictEqual(typeof db.on, 'function', 'Should have on method');
        done();
    });

    })
``` 
failed with the following error message:
```
EventEmitter should be created with options  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.