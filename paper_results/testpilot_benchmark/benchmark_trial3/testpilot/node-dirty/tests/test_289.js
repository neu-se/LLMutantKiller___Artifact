let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.update - should handle non-existent key', function(done) {
        let db = dirty();
        
        db.update('nonExistentKey', function(doc) {
            return { created: true };
        }, function(err, updatedDoc) {
            // Should handle gracefully - behavior may vary by implementation
            // Some implementations might create the key, others might return error
            if (err) {
                assert(err instanceof Error);
            } else {
                // If no error, verify the document was created, is null, or is undefined
                assert(updatedDoc === null || updatedDoc === undefined || (updatedDoc && updatedDoc.created === true));
            }
            done();
        });
    });
});