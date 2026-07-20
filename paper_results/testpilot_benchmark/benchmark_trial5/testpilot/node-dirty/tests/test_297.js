let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.rm - callback is optional', function(done) {
        let db = dirty();
        
        // Set a key first
        db.set('testKey2', 'testValue2');
        
        // Remove without callback (should not throw)
        try {
            db.rm('testKey2');
            // Verify the key was removed
            assert.strictEqual(db.get('testKey2'), undefined);
            done();
        } catch (err) {
            done(err);
        }
    });

    })