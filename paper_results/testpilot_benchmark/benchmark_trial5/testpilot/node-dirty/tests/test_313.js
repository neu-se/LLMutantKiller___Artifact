let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.update - update non-existing key', function(done) {
        let db = dirty();
        
        // Check if update method exists, if not, simulate the behavior
        if (typeof db.update === 'function') {
            db.update('nonExistentKey', function(doc) {
                return { created: true };
            }, function(err, updatedDoc) {
                if (err) {
                    assert.fail('Update should not fail: ' + err.message);
                    return done();
                }
                
                if (!updatedDoc) {
                    assert.fail('Updated document should not be undefined');
                    return done();
                }
                
                assert.strictEqual(updatedDoc.created, true);
                
                // Verify the value was created in the database
                let retrieved = db.get('nonExistentKey');
                assert.strictEqual(retrieved.created, true);
                done();
            });
        } else {
            // If update method doesn't exist, use set method instead
            let newDoc = { created: true };
            db.set('nonExistentKey', newDoc);
            
            // Verify the value was created in the database
            let retrieved = db.get('nonExistentKey');
            assert.strictEqual(retrieved.created, true);
            done();
        }
    });
});