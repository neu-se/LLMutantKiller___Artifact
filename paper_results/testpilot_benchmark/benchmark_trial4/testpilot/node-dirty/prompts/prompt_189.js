The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.prototype.emit - multiple listeners', function(done) {
        let db = dirty();
        let listener1Called = false;
        let listener2Called = false;
        
        db.on('shared-event', function(data) {
            listener1Called = true;
            assert.equal(data, 'shared-data');
        });
        
        db.on('shared-event', function(data) {
            listener2Called = true;
            assert.equal(data, 'shared-data');
            
            // Check both listeners were called
            assert.equal(listener1Called, true);
            assert.equal(listener2Called, true);
            done();
        });
        
        db.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_285.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.