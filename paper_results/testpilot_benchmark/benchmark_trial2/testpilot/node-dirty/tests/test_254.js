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
        // Create a temporary directory for test databases
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

    it('should set a value without callback', function(done) {
        let db = new dirty.Dirty(testDbPath);
        
        db.on('load', function() {
            db.set('testKey', {name: 'test', value: 123});
            
            // Verify the value was set
            let result = db.get('testKey');
            assert.strictEqual(result.name, 'test');
            assert.strictEqual(result.value, 123);
            done();
        });
    });

    })