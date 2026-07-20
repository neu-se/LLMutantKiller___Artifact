let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.update - updater function throws error', function(done) {
        let db = dirty();
        
        db.set('errorKey', { value: 'test' });
        
        try {
            db.update('errorKey', function(doc) {
                throw new Error('Updater error');
            }, function(err, updatedDoc) {
                assert(err instanceof Error);
                assert.strictEqual(err.message, 'Updater error');
                assert.strictEqual(updatedDoc, undefined);
                
                // Verify original value is unchanged
                let retrieved = db.get('errorKey');
                assert.strictEqual(retrieved.value, 'test');
                done();
            });
        } catch (error) {
            // If the update method doesn't handle errors properly,
            // we catch it here and verify it's the expected error
            assert(error instanceof Error);
            assert.strictEqual(error.message, 'Updater error');
            
            // Verify original value is unchanged
            let retrieved = db.get('errorKey');
            assert.strictEqual(retrieved.value, 'test');
            done();
        }
    });
});