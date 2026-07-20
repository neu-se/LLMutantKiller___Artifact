let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.update - should handle updater function throwing error', function(done) {
        let db = dirty();
        
        db.set('errorKey', { value: 'test' });
        
        try {
            db.update('errorKey', function(doc) {
                throw new Error('Updater error');
            }, function(err, updatedDoc) {
                // This callback might not be called if the error is thrown synchronously
                assert(err instanceof Error);
                assert.strictEqual(err.message, 'Updater error');
                
                // Verify original value is unchanged
                let retrieved = db.get('errorKey');
                assert.strictEqual(retrieved.value, 'test');
                done();
            });
        } catch (error) {
            // Handle the case where the error is thrown synchronously
            assert(error instanceof Error);
            assert.strictEqual(error.message, 'Updater error');
            
            // Verify original value is unchanged
            let retrieved = db.get('errorKey');
            assert.strictEqual(retrieved.value, 'test');
            done();
        }
    });
});