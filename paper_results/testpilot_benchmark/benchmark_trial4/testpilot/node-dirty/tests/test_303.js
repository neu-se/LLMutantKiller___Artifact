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
        db = new dirty.Dirty(testDbPath);
    });

    afterEach(function() {
        // Clean up test database file
        if (fs.existsSync(testDbPath)) {
            fs.unlinkSync(testDbPath);
        }
    });

    it('should return undefined for non-existent key', function(done) {
        db.on('load', function() {
            let result = db.get('nonexistent');
            assert.strictEqual(result, undefined);
            done();
        });
    });

    })