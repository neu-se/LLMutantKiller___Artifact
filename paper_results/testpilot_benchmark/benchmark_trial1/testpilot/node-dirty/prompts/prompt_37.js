The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('multi-test');

        setImmediate(() => {
            assert.strictEqual(listener1Called, true, 'First listener should be called');
            assert.strictEqual(listener2Called, true, 'Second listener should be called');
            done();
        });
    });
``` 
failed with the following error message:
```
listener1Called is not defined  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.