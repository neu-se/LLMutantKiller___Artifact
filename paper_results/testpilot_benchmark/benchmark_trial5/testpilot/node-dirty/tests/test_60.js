let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter with null/undefined options', function(done) {
        let db1 = dirty.Dirty.EventEmitter(null);
        let db2 = dirty.Dirty.EventEmitter(undefined);
        
        // Test that null/undefined options don't break functionality
        assert(db1 !== undefined && db1 !== null, 'Should return valid object with null options');
        assert(db2 !== undefined && db2 !== null, 'Should return valid object with undefined options');
        
        if (db1) {
            assert(typeof db1.on === 'function', 'Should handle null options');
        }
        if (db2) {
            assert(typeof db2.on === 'function', 'Should handle undefined options');
        }
        
        done();
    });
});