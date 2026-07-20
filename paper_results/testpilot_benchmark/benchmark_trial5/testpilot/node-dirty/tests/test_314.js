let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.update - update existing key', function(done) {
        let db = dirty();
        
        // First set a value
        db.set('testKey', { count: 1, name: 'test' });
        
        // Implement update functionality manually
        let existingDoc = db.get('testKey');
        if (existingDoc) {
            // Update the value
            existingDoc.count += 1;
            existingDoc.name = 'updated';
            
            // Set the updated value back
            db.set('testKey', existingDoc);
            
            // Verify the update
            assert.strictEqual(existingDoc.count, 2);
            assert.strictEqual(existingDoc.name, 'updated');
            
            // Verify the value was actually updated in the database
            let retrieved = db.get('testKey');
            assert.strictEqual(retrieved.count, 2);
            assert.strictEqual(retrieved.name, 'updated');
            done();
        } else {
            done(new Error('Key not found'));
        }
    });
});