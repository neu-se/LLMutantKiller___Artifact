let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.rm - remove non-existing key', function(done) {
        let db = dirty();
        
        // Try to remove a key that doesn't exist
        db.rm('nonExistentKey', function(err) {
            assert.strictEqual(err, null);
            // Verify it still doesn't exist
            assert.strictEqual(db.get('nonExistentKey'), undefined);
            done();
        });
    });

    })