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

    it('should close a file-based database and flush data', function(done) {
        db = dirty(testDbPath);
        
        // Handle both 'load' event (for existing files) and immediate execution (for new files)
        let loaded = false;
        
        const runTest = function() {
            if (loaded) return; // Prevent running twice
            loaded = true;
            
            db.set('key1', 'value1');
            db.set('key2', 'value2');
            
            db.close(function(err) {
                assert.strictEqual(err, undefined);
                
                // Verify the file exists and contains data
                assert.strictEqual(fs.existsSync(testDbPath), true);
                let fileContent = fs.readFileSync(testDbPath, 'utf8');
                assert(fileContent.length > 0);
                done();
            });
        };
        
        db.on('load', runTest);
        
        // For new databases, 'load' might not be emitted, so also try after a short delay
        setTimeout(runTest, 10);
    });
});