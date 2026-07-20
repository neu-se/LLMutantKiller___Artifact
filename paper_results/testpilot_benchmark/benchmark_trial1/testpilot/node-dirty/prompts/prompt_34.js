The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter - once listener', function(done) {
        let db = dirty.Dirty.EventEmitter();
        let callCount = 0;

        if (typeof db.once === 'function') {
            db.once('once-test', function() {
                callCount++;
            });

            db.em}    })
})
``` 
failed with the following error message:
```
Cannot read properties of undefined (reading 'once')  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.