The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter - remove listener', function(done) {
        let db = dirty.Dirty.EventEmitter();
        let listenerCalled = false;

        function testListener() {
            listenerCalled = true;
        }

        db.on('remove-test', testListener);
        db.removeListener('remove-test', testListener);
        db.em    })
})
``` 
failed with the following error message:
```
Cannot read properties of undefined (reading 'on')  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.