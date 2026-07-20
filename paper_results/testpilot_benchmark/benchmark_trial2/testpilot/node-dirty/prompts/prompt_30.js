The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter with data payload', function(done) {
        let emitter = dirty.Dirty.EventEmitter();
        let receivedData = null;
        
        emitter.on('data', function(data) {
            receivedData = data;
        });
        
        let testData = { key: 'value', number: 42 };
        emitter.em    })
})
``` 
failed with the following error message:
```
Cannot read properties of undefined (reading 'on')  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.