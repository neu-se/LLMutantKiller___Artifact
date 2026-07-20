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

    it('should create in-memory database when no path provided', function(done) {
        const db = new dirty.Dirty();
        
        db.on('load', (count) => {
            assert.strictEqual(count, 0);
            assert.strictEqual(db.size(), 0);
            done();
        });
    });

    })