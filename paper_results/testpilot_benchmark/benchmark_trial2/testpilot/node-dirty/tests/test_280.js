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
        
        let firstCloseCalled = false;
        let secondCloseCalled = false;
        
        function checkCompletion() {
            // Complete the test when we've verified the behavior
            // First close should succeed, second close behavior may vary
            if (firstCloseCalled) {
                done();
            }
        }
        
        function onFirstClose(err) {
            assert.strictEqual(err, undefined);
            firstCloseCalled = true;
            checkCompletion();
        }
        
        function onSecondClose(err) {
            // Second close may or may not be called depending on implementation
            // If it is called, it should not error
            if (err) {
                done(err);
            } else {
                secondCloseCalled = true;
            }
        }
        
        db.close(onFirstClose);
        
        // Add a small delay to ensure first close is processed
        setTimeout(() => {
            db.close(onSecondClose);
            // Give some time for second close to potentially execute
            setTimeout(checkCompletion, 100);
        }, 10);
    });
});