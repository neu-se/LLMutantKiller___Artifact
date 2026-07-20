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

    it('should close database with pending writes', function(done) {
        db = dirty(testDbPath);
        
        db.on('load', function() {
            // Add multiple entries quickly
            for (let i = 0; i < 10; i++) {
                db.set(`key${i}`, `value${i}`);
            }
            
            // Close immediately while writes might be pending
            db.close(function(err) {
                assert.strictEqual(err, null);
                
                // Verify data was written
                assert.ok(fs.existsSync(testDbPath));
                let content = fs.readFileSync(testDbPath, 'utf8');
                assert.ok(content.includes('key0'));
                assert.ok(content.includes('key9'));
                done();
            });
        });
    });
});