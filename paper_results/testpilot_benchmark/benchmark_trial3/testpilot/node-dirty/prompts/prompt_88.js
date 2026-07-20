The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test prependListener with multiple prepended listeners', function(done) {
        let db = dirty();
        let callOrder = [];
        
        // Add a regular listener
        db.on('multi-test', function() {
            callOrder.push('last');
        });
        
        // Prepend first listener
        db.prependListener('multi-test', function() {
            callOrder.push('second');
        });
        
        // Prepend another listener - this should be first
        db.prependListener('multi-test', function() {
            callOrder.push('first');
        });
        
        db.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_138.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.