The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter with empty options', function(done) {
        let emitter = dirty.Dirty.EventEmitter({});
        
        // Test multiple listeners
        let count = 0;
        emitter.on('increment', function() {
            count++;
        });
        
        emitter.on('increment', function() {
            count++;
            if (count === 2) {
                done();
            }
        });
        
        emitter.em    })
})
``` 
failed with the following error message:
```
Cannot read properties of undefined (reading 'on')  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.