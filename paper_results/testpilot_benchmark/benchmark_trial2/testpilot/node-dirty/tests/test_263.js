let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.rm removes existing key', function(done) {
        let db = dirty();
        
        // First set a key-value pair
        db.set('testKey', 'testValue', function(err) {
            assert.ifError(err);
            
            // Verify the key exists
            assert.strictEqual(db.get('testKey'), 'testValue');
            
            // Remove the key
            db.rm('testKey', function(err) {
                assert.ifError(err);
                
                // Verify the key is now undefined
                assert.strictEqual(db.get('testKey'), undefined);
                done();
            });
        });
    });
    
    })