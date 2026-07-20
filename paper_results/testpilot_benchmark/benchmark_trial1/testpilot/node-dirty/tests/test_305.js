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
        
        function onFirstClose(err) {
            assert.strictEqual(err, null);
            firstCloseCalled = true;
            checkCompletion();
        }
        
        function onSecondClose(err) {
            // Second close might not call callback or might call with error
            // We just need to verify it doesn't crash
            secondCloseCalled = true;
            checkCompletion();
        }
        
        function checkCompletion() {
            if (firstCloseCalled) {
                // Give a small delay to see if second callback gets called
                setTimeout(() => {
                    done();
                }, 100);
            }
        }
        
        db.close(onFirstClose);
        db.close(onSecondClose);
    });
});