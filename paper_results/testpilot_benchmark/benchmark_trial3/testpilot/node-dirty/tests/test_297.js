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
            // Second close might not call the callback, or might call with no error
            secondCloseCalled = true;
            checkCompletion();
        }
        
        function checkCompletion() {
            // Complete the test when first close is called
            // Second close callback may or may not be called depending on implementation
            if (firstCloseCalled) {
                // Give a small delay to see if second callback gets called
                setTimeout(() => {
                    done();
                }, 10);
            }
        }
        
        db.close(onFirstClose);
        db.close(onSecondClose);
    });
});