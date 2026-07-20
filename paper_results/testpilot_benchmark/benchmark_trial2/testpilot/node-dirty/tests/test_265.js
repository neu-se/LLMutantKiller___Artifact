let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.rm - remove existing key', function(done) {
        let db = dirty();
        
        // First set a key-value pair
        db.set('testKey', 'testValue');
        
        // Verify it exists
        assert.strictEqual(db.get('testKey'), 'testValue');
        
        // Remove the key
        db.rm('testKey', function(err) {
            assert.strictEqual(err, undefined);
            // Verify the key no longer exists
            assert.strictEqual(db.get('testKey'), undefined);
            done();
        });
    });
});