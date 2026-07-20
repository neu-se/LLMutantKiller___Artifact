let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let fs = require('fs');
let path = require('path');

describe('test dirty', function() {
    let db;
    let testDbPath;

    beforeEach(function() {
        // Create a temporary database file for each test
        testDbPath = path.join(__dirname, 'test_' + Date.now() + '.db');
        db = dirty(testDbPath);
    });

    afterEach(function() {
        // Clean up the test database file
        if (fs.existsSync(testDbPath)) {
            fs.unlinkSync(testDbPath);
        }
    });

    it('should set a key-value pair with callback', function(done) {
        db.set('testKey', 'testValue', function(err) {
            assert.strictEqual(err, null);
            assert.strictEqual(db.get('testKey'), 'testValue');
            done();
        });
    });

    })