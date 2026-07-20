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

    it('test dirty.Dirty can handle multiple key-value pairs', function(done) {
        let db = dirty.Dirty(testDbPath);
        
        db.on('load', function() {
            db.set('key1', 'value1');
            db.set('key2', 'value2');
            db.set('key3', 'value3');
            
            assert.strictEqual(db.get('key1'), 'value1');
            assert.strictEqual(db.get('key2'), 'value2');
            assert.strictEqual(db.get('key3'), 'value3');
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