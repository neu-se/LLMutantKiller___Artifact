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
        
        db.on('multi-listener', function() {
            listener1Called = true;
        });
        
        db.on('multi-listener', function() {
            listener2Called = true;
        });
        
        db.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_252.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.