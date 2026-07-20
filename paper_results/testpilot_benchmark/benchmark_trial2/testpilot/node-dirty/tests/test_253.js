let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let fs = require('fs');
let path = require('path');
let os = require('os');

describe('test dirty', function() {
    let tempDir;
    let tempFile;
    
    beforeEach(function() {
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
        tempFile = path.join(tempDir, 'test.db');
    });
    
    afterEach(function() {
        // Clean up temp files
        try {
            if (fs.existsSync(tempFile)) {
                fs.unlinkSync(tempFile);
            }
            fs.rmdirSync(tempDir);
        } catch (e) {
            // Ignore cleanup errors
        }
    });

    it('should set and store data in memory without file path', function(done) {
        let db = new dirty();
        let callbackCalled = false;
        
        db.set('testKey', {name: 'test'}, function() {
            callbackCalled = true;
        });
        
        // Verify data is set in memory
        assert.strictEqual(db.get('testKey').name, 'test');
        
        // Wait for drain event and callback
        db.on('drain', function() {
            assert.strictEqual(callbackCalled, true);
            done();
        });
    });

    })