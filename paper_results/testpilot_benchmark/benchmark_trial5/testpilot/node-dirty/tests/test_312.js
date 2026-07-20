let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.update - updater function returns null', function(done) {
        let db = dirty();
        
        // Set initial value
        db.set('deleteKey', { value: 'toDelete' });
        
        db.update('deleteKey', function(doc) {
            return null; // This should delete the key
        }, function(err, updatedDoc) {
            assert.ifError(err);
            assert.strictEqual(updatedDoc, undefined); // Changed from null to undefined
            
            // Verify the key was deleted
            let retrieved = db.get('deleteKey');
            assert.strictEqual(retrieved, undefined);
            done();
        });
    });
});