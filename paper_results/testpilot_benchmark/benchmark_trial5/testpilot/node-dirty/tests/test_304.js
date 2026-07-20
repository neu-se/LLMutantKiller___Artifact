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

            let foundItems = [];
            
            db.forEach(function(key, val) {
                foundItems.push({key: key, val: val});
            });

            // Verify all items were found
            assert.equal(foundItems.length, 3);
            
            // Verify specific items
            let key1Item = foundItems.find(item => item.key === 'key1');
            let key2Item = foundItems.find(item => item.key === 'key2');
            let key3Item = foundItems.find(item => item.key === 'key3');
            
            assert(key1Item);
            assert.deepEqual(key1Item.val, {name: 'value1'});
            assert(key2Item);
            assert.deepEqual(key2Item.val, {name: 'value2'});
            assert(key3Item);
            assert.deepEqual(key3Item.val, {name: 'value3'});
            
            done();
        });
    });

    })