The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let fs = require('fs');
let path = require('path');

describe('test dirty', function() {
    let testDbPath;
    let db;

    beforeEach(function() {
        // Create a unique test database file for each test
        testDbPath = path.join(__dirname, `test-${Date.now()}-${Math.random()}.db`);
    });

    afterEach(function() {
        // Clean up test database file
        try {
            if (fs.existsSync(testDbPath)) {
                fs.unlinkSync(testDbPath);
            }
        } catch (err) {
            // Ignore cleanup errors
        }
    });

    it('should handle multiple close calls gracefully', function(done) {
        db = dirty();
        db.set('key1', 'value1');
        
        let closeCount = 0;
        let expectedCloses = 2;
        
        function onClose(err) {
            assert.strictEqual(err, null);
            closeCount++;
            if (closeCount === expectedCloses) {
                done();
            }
        }
        
        db.close(onClose);
        db.close(onClose);
    });

    })
``` 
failed with the following error message:
```
Timeout of 2000ms exceeded. For async tests and hooks, ensure "done()" is called; if returning a Promise, ensure it resolves. (/path/to/test/test_293.js)  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.