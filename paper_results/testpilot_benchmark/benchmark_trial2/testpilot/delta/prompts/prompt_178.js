The test:
```
let mocha = require('mocha');
let assert = require('assert');
let quill_delta = require('quill-delta');

describe('test quill_delta', function() {
    it('test quill-delta.getHandler - should return handler when embed type exists', function(done) {
        // Create a new Delta instance
        let delta = new quill_delta();
        
        // Add a mock handler for testing
        const mockHandler = function(embed) { return embed; };
        delta.handlers = delta.handlers || {};
        delta.handlers['image'] = mockHandler;
        
        // Test that getHandler returns the correct handler
        const handler = delta.getHandler('image');
        assert.strictEqual(handler, mockHandler);
        done();
    });
    
    })
``` 
failed with the following error message:
```
delta.getHandler is not a function  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.