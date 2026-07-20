let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.update - update existing key', function(done) {
        let db = dirty();
        
        // First set a value
        db.set('testKey', { count: 1, name: 'test' });
        
        // Update the value
        db.update('testKey', function(doc) {
            doc.count += 1;
            doc.name = 'updated';
            return doc;
        }, function(err, updatedDoc) {
            assert.ifError(err);
            assert.strictEqual(updatedDoc.count, 2);
            assert.strictEqual(updatedDoc.name, 'updated');
            
            // Verify the value was actually updated in the database
            let retrieved = db.get('testKey');
            assert.strictEqual(retrieved.count, 2);
            assert.strictEqual(retrieved.name, 'updated');
            done();
        });
    });

    })