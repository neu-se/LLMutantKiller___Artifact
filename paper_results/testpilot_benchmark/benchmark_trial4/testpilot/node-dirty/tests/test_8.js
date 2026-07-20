let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let fs = require('fs');
let path = require('path');
let os = require('os');

describe('test dirty', function() {
    let tempDir;
    let dbPath;
    
    beforeEach(function() {
        tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'dirty-test-'));
        dbPath = path.join(tempDir, 'test.db');
    });
    
    afterEach(function() {
        // Clean up temp files
        try {
            if (fs.existsSync(dbPath)) {
                fs.unlinkSync(dbPath);
            }
            fs.rmdirSync(tempDir);
        } catch (e) {
            // Ignore cleanup errors
        }
    });

    it('should create in-memory database when no path provided', function(done) {
        const db = new dirty.Dirty();
        
        db.on('load', function(length) {
            assert.strictEqual(length, 0);
            assert.strictEqual(db.size(), 0);
            done();
        });
    });

    })