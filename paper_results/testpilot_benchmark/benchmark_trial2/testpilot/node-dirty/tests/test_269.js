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

    it('should iterate over all key-value pairs', function(done) {
        db.on('load', function() {
            // Add test data
            db.set('key1', {name: 'value1'});
            db.set('key2', {name: 'value2'});
            db.set('key3', {name: 'value3'});

            let foundPairs = [];
            
            db.forEach(function(key, val) {
                foundPairs.push({key: key, val: val});
            });

            // Verify all pairs were found
            assert.equal(foundPairs.length, 3);
            
            // Check that all expected keys are present
            let keys = foundPairs.map(pair => pair.key);
            assert(keys.includes('key1'));
            assert(keys.includes('key2'));
            assert(keys.includes('key3'));

            // Check that values are correct
            let key1Pair = foundPairs.find(pair => pair.key === 'key1');
            assert.deepEqual(key1Pair.val, {name: 'value1'});

            done();
        });
    });

    })