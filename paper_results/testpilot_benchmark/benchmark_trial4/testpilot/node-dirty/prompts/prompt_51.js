The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter - multiple listeners', function(done) {
        let db = dirty.Dirty.EventEmitter();
        let listener1Called = false;
        let listener2Called = false;

        db.on('multi-test', function() {
            listener1Called = true;
        });

        db.on('multi-test', function() {
            listener2Called = true;
            // Check both listeners were called
            assert(listener1Called, 'First listener should be called');
            assert(listener2Called, 'Second listener should be called');
            done();
        });

        db.em    })
})
``` 
failed with the following error message:
```
Cannot read properties of undefined (reading 'on')  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.