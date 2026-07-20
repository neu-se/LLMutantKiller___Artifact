The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('remove-test');

        setImmediate(() => {
            assert.strictEqual(listenerCalled, false, 'Removed listener should not be called');
            done();
        });
    });
``` 
failed with the following error message:
```
listenerCalled is not defined  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.