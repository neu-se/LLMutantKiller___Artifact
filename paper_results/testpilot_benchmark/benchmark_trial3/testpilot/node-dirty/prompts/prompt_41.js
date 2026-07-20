The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter event removal', function(done) {
        let emitter = dirty.Dirty.EventEmitter();
        let called = false;
        
        function listener() {
            called = true;
        }
        
        emitter.on('test', listener);
        emitter.removeListener('test', listener);
        emitter.em    })
})
``` 
failed with the following error message:
```
Cannot read properties of undefined (reading 'on')  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.