The test:
```
let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let fs = require('fs');
let path = require('path');
let os = require('os');

describe('test dirty', function() {
    let tempDir;
    let testDbPath;
    
    beforeEach(function() {
        // Create a temporary directory for test files
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
        testDbPath = path.join(tempDir, 'test.db');
    });
    
    afterEach(function() {
        // Clean up temporary files
        try {
            if (fs.existsSync(testDbPath)) {
                fs.unlinkSync(testDbPath);
            }
            fs.rmdirSync(tempDir);
        } catch (err) {
            // Ignore cleanup errors
        }
    });

    it('test dirty.Dirty can set and get values', function(done) {
        let db = dirty.Dirty(testDbPath);
        
        db.on('load', function() {
            db.set('testKey', 'testValue');
            let value = db.get('testKey');
            assert.strictEqual(value, 'testValue');
            done();
        });
    });
    
    })
``` 
failed with the following error message:
```
Class constructor Dirty cannot be invoked without 'new'  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.