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

    it('should set a key-value pair in memory without persistence', function(done) {
        const db = dirty();
        
        db.set('testKey', 'testValue', function() {
            assert.strictEqual(db.get('testKey'), 'testValue');
            done();
        });
    });

    })