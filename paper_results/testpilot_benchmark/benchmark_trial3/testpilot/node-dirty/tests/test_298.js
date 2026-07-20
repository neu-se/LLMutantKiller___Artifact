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
                assert.strictEqual(err, null);
                
                // Verify the file exists and contains data
                assert.ok(fs.existsSync(testDbPath));
                let fileContent = fs.readFileSync(testDbPath, 'utf8');
                assert.ok(fileContent.length > 0);
                done();
            });
        };
        
        db.on('load', runTest);
        
        // If the database is ready immediately (new file), run the test
        setTimeout(runTest, 10);
    });
});