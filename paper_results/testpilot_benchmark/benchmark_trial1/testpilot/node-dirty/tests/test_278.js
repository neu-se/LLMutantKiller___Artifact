let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.rm - remove key without callback', function() {
        let db = dirty();
        
        // Set a key first
        db.set('testKey2', 'testValue2');
        assert.strictEqual(db.get('testKey2'), 'testValue2');
        
        // Remove without callback (should not throw)
        assert.doesNotThrow(() => {
            db.rm('testKey2');
        });
        
        // Verify the key is removed
        assert.strictEqual(db.get('testKey2'), undefined);
    });

    })