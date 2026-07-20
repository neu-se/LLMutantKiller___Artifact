The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.prependListener - with arguments', function(done) {
        let db = dirty();
        let receivedArgs = [];
        
        db.on('args-test', function(arg1, arg2) {
            receivedArgs.push(['regular', arg1, arg2]);
        });
        
        db.prependListener('args-test', function(arg1, arg2) {
            receivedArgs.push(['prepended', arg1, arg2]);
        });
        
        db.em    })
})
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_131.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.