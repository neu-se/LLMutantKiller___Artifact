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
        
        // Use a small timeout to ensure the database is ready
        setTimeout(function() {
            // Add multiple entries quickly
            for (let i = 0; i < 10; i++) {
                db.set(`key${i}`, `value${i}`);
            }
            
            // Close immediately without waiting for writes
            db.close(function(err) {
                assert.strictEqual(err, null);
                done();
            });
        }, 10);
    });
});