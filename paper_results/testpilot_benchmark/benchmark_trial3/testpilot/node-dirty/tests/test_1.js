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
        if (db) {
            db = null;
        }
        try {
            if (fs.existsSync(testDbPath)) {
                fs.unlinkSync(testDbPath);
            }
        } catch (err) {
            // Ignore cleanup errors
        }
    });

    it('should create a dirty database instance', function(done) {
        db = dirty(testDbPath);
        assert(db, 'Database instance should be created');
        assert.equal(typeof db.set, 'function', 'Should have set method');
        assert.equal(typeof db.get, 'function', 'Should have get method');
        done();
    });

    })