let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.update - should handle updater function returning null', function(done) {
        let db = dirty();
        
        db.set('deleteKey', { value: 'toDelete' });
        
        db.update('deleteKey', function(doc) {
            return null; // Effectively delete
        }, function(err, updatedDoc) {
            assert.ifError(err);
            assert.equal(updatedDoc, null);
            
            // Verify the key was removed
            let retrieved = db.get('deleteKey');
            assert.equal(retrieved, undefined);
            done();
        });
    });

    })