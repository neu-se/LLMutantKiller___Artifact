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

    it('test dirty.Dirty can store different data types', function(done) {
        let db = dirty.Dirty(testDbPath);
        
        db.on('load', function() {
            let testObject = { name: 'test', value: 42 };
            let testArray = [1, 2, 3];
            
            db.set('string', 'hello');
            db.set('number', 123);
            db.set('object', testObject);
            db.set('array', testArray);
            db.set('boolean', true);
            
            assert.strictEqual(db.get('string'), 'hello');
            assert.strictEqual(db.get('number'), 123);
            assert.deepStrictEqual(db.get('object'), testObject);
            assert.deepStrictEqual(db.get('array'), testArray);
            assert.strictEqual(db.get('boolean'), true);
            done();
        });
    });
});
``` 
failed with the following error message:
```
Class constructor Dirty cannot be invoked without 'new'  
```

Your task is to modify the above code to fix the test. 

Provide your answer as a fenced code block.