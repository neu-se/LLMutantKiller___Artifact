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
        let db = new dirty.Dirty();
        let callbackCalled = false;
        
        db.on('drain', function() {
            assert.strictEqual(db.get('testKey'), 'testValue');
            assert.strictEqual(callbackCalled, true);
            done();
        });
        
        db.set('testKey', 'testValue', function() {
            callbackCalled = true;
        });
    });

    })