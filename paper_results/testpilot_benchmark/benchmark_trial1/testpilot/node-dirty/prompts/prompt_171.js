The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.prototype.emit - basic event emission', function(done) {
        let db = dirty();
        let eventFired = false;
        
        db.on('test-event', function() {
            eventFired = true;
        });
        
        db.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_248.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.