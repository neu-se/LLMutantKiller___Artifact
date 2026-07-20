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
        if (fs.existsSync(tempFile)) {
            fs.unlinkSync(tempFile);
        }
        fs.rmdirSync(tempDir);
    });

    it('should set a key-value pair without persistence', function(done) {
        const db = dirty();
        
        db.set('testKey', 'testValue', function() {
            assert.strictEqual(db.get('testKey'), 'testValue');
            done();
        });
    });

    })