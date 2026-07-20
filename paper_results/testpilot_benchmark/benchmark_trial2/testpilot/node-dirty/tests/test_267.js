let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.forEach - iterates over all entries', function(done) {
        let db = dirty();
        
        // Add some test data
        db.set('key1', 'value1');
        db.set('key2', 'value2');
        db.set('key3', 'value3');
        
        let results = [];
        db.forEach(function(key, val) {
            results.push([key, val]);
        });
        
        assert.equal(results.length, 3);
        assert.deepEqual(results, [
            ['key1', 'value1'],
            ['key2', 'value2'],
            ['key3', 'value3']
        ]);
        
        done();
    });
    
    })