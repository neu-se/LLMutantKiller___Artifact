let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.forEach - iterates over all key-value pairs', function(done) {
        let db = new dirty();
        let results = [];
        
        // Add some test data
        db.set('key1', 'value1');
        db.set('key2', 'value2');
        db.set('key3', 'value3');
        
        // Test forEach iteration
        db.forEach(function(key, val) {
            results.push({key: key, val: val});
        });
        
        // Verify all items were iterated
        assert.equal(results.length, 3);
        assert.deepEqual(results[0], {key: 'key1', val: 'value1'});
        assert.deepEqual(results[1], {key: 'key2', val: 'value2'});
        assert.deepEqual(results[2], {key: 'key3', val: 'value3'});
        
        done();
    });
    
    })