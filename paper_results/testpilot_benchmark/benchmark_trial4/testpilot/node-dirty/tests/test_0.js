let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let fs = require('fs');
let path = require('path');

describe('test dirty', function() {
    let db;
    let testDbPath;

    beforeEach(function() {
        // Create a temporary database file path
        testDbPath = path.join(__dirname, 'test-' + Date.now() + '.db');
    });

    afterEach(function(done) {
        // Clean up: close database and remove test file
        if (db) {
            db.close();
        }
        if (fs.existsSync(testDbPath)) {
            fs.unlinkSync(testDbPath);
        }
        done();
    });

    it('should create an in-memory database', function(done) {
        db = dirty();
        assert(db, 'Database should be created');
        assert.equal(typeof db.set, 'function', 'Should have set method');
        assert.equal(typeof db.get, 'function', 'Should have get method');
        done();
    });

    })